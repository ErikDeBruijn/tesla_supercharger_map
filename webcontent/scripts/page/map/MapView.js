define(
    ['util/Events', 'util/EventBus', 'util/Objects', 'site/SiteIterator', 'site/SitePredicates', 'site/Sites',
        'page/map/MapViewContextMenu', 'page/map/InfoWindowRender', 'page/map/StatusModel',
        'page/map/MarkerFactory', 'page/map/RoutingWaypoint', 'util/QueryStrings'],
    function (Events, EventBus, Objects, SiteIterator, SitePredicates, Sites, MapViewContextMenu, InfoWindowRender, statusModel, MarkerFactory, RoutingWaypoint, QueryStrings) {

        /**
         * Constructor.
         */
        var MapView = function (controlState) {

            this.controlState = controlState;
            this.viewDiv = $("#map-canvas");

            this.initMap();

            // handle clicks to toggle supercharger circle
            jQuery(document).on('click', '.circle-toggle-trigger', jQuery.proxy(this.handleCircleToggle, this));
            // handle clicks to remove supercharger marker
            jQuery(document).on('click', '.marker-toggle-trigger', jQuery.proxy(this.handleMarkerRemove, this));
            // handle clicks to remove supercharger marker
            jQuery(document).on('click', '.add-to-route-trigger', jQuery.proxy(this.handleAddToRoute, this));
            // handle clicks to remove supercharger marker
            jQuery(document).on('click', '.zoom-to-site-trigger', jQuery.proxy(this.zoomToMarker, this));

            //
            // Map context menu
            //
            this.contextMenu = new MapViewContextMenu(this.googleMap);
            this.contextMenu.on("context-menu-add-marker", jQuery.proxy(this.handleAddMarker, this));
            this.contextMenu.on("context-menu-add-to-route", jQuery.proxy(this.handleAddToRouteContextMenu, this));

            EventBus.addEventListener("status-model-changed-event", this.handleStatusModelChange, this);
        };

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Map Initial Settings
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        MapView.INITIAL_LAT = 38.0;
        MapView.INITIAL_LNG = -96.5;
        MapView.INITIAL_ZOOM = 5;

        try // We don't want to interrupt the load because of bad parameters
        {
            var initialCenter = QueryStrings.getByName("Center");
            if (initialCenter) {
                MapView.INITIAL_LAT = parseFloat(initialCenter.split(",")[0]);
                MapView.INITIAL_LNG = parseFloat(initialCenter.split(",")[1]);
            }

            var initialZoom = QueryStrings.getByName("Zoom");
            if ((initialZoom) && (!isNaN(initialZoom))) {
                MapView.INITIAL_ZOOM = parseInt(initialZoom);
            }
        } catch (e) {
            if (window.console) {
                window.console.log(e);
            }
        }

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Event methods that delegate to jquery object for triggering/observing custom events.
//
// map-event-route-added          [{}]
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

        MapView.prototype.on = function (eventName, callback) {
            this.viewDiv.on(eventName, callback);
        };
        MapView.prototype.trigger = function (eventName, extraData) {
            this.viewDiv.trigger(eventName, extraData);
        };

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Initialization
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

        /**
         * Initialize map
         */
        MapView.prototype.initMap = function () {

            var mapOptions = {
                center: new google.maps.LatLng(MapView.INITIAL_LAT, MapView.INITIAL_LNG),
                zoom: MapView.INITIAL_ZOOM,
                scaleControl: true,
                mapTypeControl: true,
                mapTypeControlOptions: {
                    mapTypeIds: [google.maps.MapTypeId.SATELLITE, google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.HYBRID, google.maps.MapTypeId.TERRAIN],
                    style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR
                },
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            this.googleMap = new google.maps.Map(this.viewDiv.get(0), mapOptions);

            this.markerFactory = new MarkerFactory(this.googleMap, this.controlState);

            var rangeCircleOptions = this.buildRangeCircleOptions();
            var mapView = this;

            new SiteIterator().iterate(
                function (supercharger) {
                    supercharger.marker = mapView.markerFactory.createMarker(supercharger);
                    rangeCircleOptions.center = supercharger.location;
                    supercharger.circle = new google.maps.Circle(rangeCircleOptions);
                }
            );

        };

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Drawing
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

        MapView.prototype.handleStatusModelChange = function (event) {
            var mapView = this;
            new SiteIterator()
                .withPredicate(SitePredicates.NOT_USER_ADDED)
                .iterate(function (supercharger) {
                    var visible = mapView.shouldDraw(supercharger);
                    supercharger.marker.setVisible(visible);
                    supercharger.circle.setVisible(visible);
                    if (Objects.isNotNullOrUndef(supercharger.marker.infoWindow)) {
                        supercharger.marker.infoWindow.close();
                        supercharger.marker.infoWindow = null;
                    }
                });
        };

        MapView.prototype.setAllRangeCircleVisibility = function (isVisible) {
            new SiteIterator()
                .withPredicate(SitePredicates.HAS_CIRCLE)
                .iterate(
                function (supercharger) {
                    if (supercharger.marker.visible) {
                        supercharger.circle.setVisible(isVisible);
                    }
                }
            );
        };

        MapView.prototype.redrawCircles = function () {
            var rangeCircleOptions = this.buildRangeCircleOptions();

            new SiteIterator().iterate(
                function (supercharger) {
                    rangeCircleOptions.center = supercharger.location;
                    supercharger.circle.setOptions(rangeCircleOptions);
                }
            );
        };

        MapView.prototype.shouldDraw = function (supercharger) {
            return (supercharger.isOpen() && statusModel.showOpen) ||
                (supercharger.isConstruction() && statusModel.showConstruction) ||
                (supercharger.isPermit() && statusModel.showPermit) ||
                supercharger.isUserAdded();
        };

        MapView.prototype.buildRangeCircleOptions = function () {
            return {
                strokeColor: this.controlState.borderColor,
                strokeOpacity: this.controlState.borderOpacity,
                strokeWeight: 1,
                fillColor: this.controlState.fillColor,
                fillOpacity: this.controlState.fillOpacity,
                map: this.googleMap,
                radius: this.controlState.range.getRangeMeters(),
                clickable: false
            };
        };

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Geo-coding
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

        MapView.prototype.zoomToLocation = function (locationText) {
            var geocodeService = new google.maps.Geocoder();
            var request = { address: locationText};
            geocodeService.geocode(request, jQuery.proxy(this.zoomToLocationResponseHandler, this));
        };

        MapView.prototype.zoomToLocationResponseHandler = function (resultArray, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                var firstResult = resultArray[0];
                var geometry = firstResult.geometry;
                this.googleMap.setCenter(geometry.location);
                this.googleMap.fitBounds(geometry.bounds);
            } else {
                if (window.alert) {
                    window.alert("result: " + status);
                }
            }
        };

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// getters/setters
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

        MapView.prototype.setControlState = function (controlState) {
            this.controlState = controlState;
        };

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// InfoWindow Event handlers
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

        MapView.prototype.handleCircleToggle = function (event) {
            var eventDetail = Events.eventDetail(event);
            var id = parseInt(eventDetail.actionName);
            var supercharger = Sites.getById(id);
            if (supercharger.circle.getVisible()) {
                eventDetail.link.text("circle on");
                supercharger.circle.setVisible(false);
            } else {
                eventDetail.link.text("circle off");
                supercharger.circle.setVisible(true);
            }
        };

        MapView.prototype.handleMarkerRemove = function (event) {
            event.preventDefault();
            var id = parseInt($(event.target).attr('href'));
            var supercharger = Sites.getById(id);
            supercharger.circle.setMap(null);
            supercharger.marker.setMap(null);
            Sites.removeById(id);
        };

        MapView.prototype.handleAddToRoute = function (event) {
            var eventDetail = Events.eventDetail(event);
            var id = parseInt(eventDetail.actionName);
            var supercharger = Sites.getById(id);
            this.trigger("map-event-route-added", new RoutingWaypoint(supercharger.location, supercharger.displayName));
        };

        MapView.prototype.zoomToMarker = function (event) {
            var eventDetail = Events.eventDetail(event);
            var id = parseInt(eventDetail.actionName);
            var supercharger = Sites.getById(id);

            this.googleMap.setZoom(15);
            this.googleMap.panTo(supercharger.location);
        };


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Context menu handlers.
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


        MapView.prototype.handleAddToRouteContextMenu = function (event) {
            this.trigger("map-event-route-added", new RoutingWaypoint(event.latLng, "Custom Location"));
        };

        /**
         * Add a custom marker and range circle to the map.
         */
        MapView.prototype.handleAddMarker = function (event) {
            var markerDialog = $("#new-marker-dialog");
            var markerNameInput = $("#new-marker-name-input");
            var markerAddButton = markerDialog.find(".btn-primary");
            var mapView = this;

            markerAddButton.click(function () {
                markerDialog.modal("hide");
                var markerName = markerNameInput.val();
                var newCharger = Sites.addSupercharger(markerName, event.latLng);
                newCharger.marker = mapView.markerFactory.createMarker(newCharger);
                var rangeCircleOptions = mapView.buildRangeCircleOptions();
                rangeCircleOptions.center = newCharger.location;
                newCharger.circle = new google.maps.Circle(rangeCircleOptions);
                var showInfoWindowForNewMarker = new google.maps.event.trigger(newCharger.marker, 'click');
            });

            // Focus on input field after dialog is shown.
            markerDialog.on('shown.bs.modal', function (e) {
                markerNameInput.focus();
            });
            // Clear input field after any type of dialog close
            markerDialog.on('hidden.bs.modal', function (e) {
                markerNameInput.val("");
                markerAddButton.unbind();
            });

            markerDialog.modal();
        };

        return MapView;

    });