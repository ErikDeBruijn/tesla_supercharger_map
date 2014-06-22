define(
    [
        'lib/bootstrap',
        'page/map/SuperchargerCarousel', 'page/map/StatusControlView', 'page/map/RangeControlView',
        'page/map/action/WayBackAction', 'page/map/action/ToggleRangeCirclesAction', 'page/map/action/ControlToggleAction',
        'page/map/action/StatusSelectionAction',
        'nav/NavBarDropdown', 'page/map/Routing',
        'page/map/ControlState', 'page/map/MapView', 'page/map/ControlView', 'lib/jquery.doTimeout'
    ],
    function (bootstrap, SuperchargerCarousel, StatusControlView, RangeControlView,
              WayBackAction, ToggleRangeCirclesAction, ControlToggleAction, StatusSelectionAction,
              NavBarDropDown, Routing, ControlState, MapView, ControlView) {

        /**
         *
         * @constructor
         */
        var MapPage = function () {
            this.page = $("#page-map");
        };

        MapPage.INIT_PROP = "page-initialized";

        MapPage.prototype.onPageShow = function () {
            if (!this.page.data(MapPage.INIT_PROP)) {
                this.initialize();
                this.page.data(MapPage.INIT_PROP, true);
            }
            $("#navbar-map-dropdown").show();
            $("#navbar-map-search").show();
            $("#carousel-container").show();
        };

        MapPage.prototype.onPageHide = function () {
            $("#navbar-map-dropdown").hide();
            $("#navbar-map-search").hide();
            $("#carousel-container").hide();
        };

        MapPage.prototype.initialize = function () {
            var controlState = new ControlState();

            this.navBarDropDown = new NavBarDropDown();

            this.superChargerCarousel = new SuperchargerCarousel();
            this.mapView = new MapView(controlState);
            this.controlView = new ControlView(controlState);

            new StatusControlView();
            new RangeControlView();

            this.routing = new Routing(this.mapView.googleMap);

            this.action1 = new WayBackAction(this.mapView.googleMap);
            this.action2 = new ToggleRangeCirclesAction(this.mapView);
            this.action3 = new ControlToggleAction(controlState);
            this.action4 = new StatusSelectionAction(controlState);

            this.initMapViewListeners();
            this.initControlViewListeners();
        };

        /**
         * INIT: MapView
         */
        MapPage.prototype.initMapViewListeners = function () {
            this.mapView.on("map-event-route-added", jQuery.proxy(this.routing.handleAddRouteEvent, this.routing));
        };


        /**
         * INIT: ControlView
         */
        MapPage.prototype.initControlViewListeners = function () {

            var mapView = this.mapView;
            var controlView = this.controlView;

            // Callback: fill-opacity change
            //
            controlView.getFillOpacitySlider().on("range-change-event", function (event, newFillOpacity) {
                controlView.controlState.fillOpacity = newFillOpacity;
                mapView.redrawCircles();
            });

            // Callback: fill color change
            //
            controlView.on("fill-color-change-event", function (event, controlState) {
                mapView.setControlState(controlState);
                mapView.redrawCircles();
            });

            // Callback: fill-opacity change
            //
            controlView.getBorderOpacitySlider().on("range-change-event", function (event, newBorderOpacity) {
                controlView.controlState.borderOpacity = newBorderOpacity;
                mapView.redrawCircles();
            });

            // Callback: fill color change
            //
            controlView.on("border-color-change-event", function (event, controlState) {
                mapView.setControlState(controlState);
                mapView.redrawCircles();
            });

            // Callback: zoom to location
            //
            controlView.on("control-event-zoom-location", function (event, locationText) {
                mapView.zoomToLocation(locationText);
            });

        };

        return MapPage;

    });