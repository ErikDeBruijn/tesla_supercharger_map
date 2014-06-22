define(['util/EventBus', 'page/map/RoutingPanel', 'page/map/RoutingModel'], function (EventBus, RoutingPanel, routingModel) {

    /**
     *
     * @constructor
     */
    var Routing = function (googleMap) {
        this.googleMap = googleMap;
        this.directionsService = new google.maps.DirectionsService();
        this.routingPanel = new RoutingPanel();

        this.directionsRenderer = new google.maps.DirectionsRenderer({
            map: googleMap,
            panel: this.routingPanel.getDirectionsPanel().get(0),
            preserveViewport: true,
            suppressMarkers: true,
            draggable: true
        });

        EventBus.addEventListener("route-model-changed-event", this.handleModelChange, this);
    };

    Routing.prototype.handleAddRouteEvent = function (event, routingWaypoint) {
        this.routingPanel.show();
        routingModel.addWaypoint(routingWaypoint);
    };

    Routing.prototype.handleModelChange = function () {
        this.routingPanel.clearDirections();
        if (routingModel.size() > 1) {
            this.directionsRenderer.setMap(this.googleMap);
            var directionsRequest = {
                origin: routingModel.getFirstLatLng().latLng,
                destination: routingModel.getLastLatLng().latLng,
                waypoints: routingModel.getBetweenLatLngList(),
                travelMode: google.maps.TravelMode.DRIVING
            };
            this.directionsService.route(directionsRequest, jQuery.proxy(this.handleRouteResponse, this));
        } else {
            this.directionsRenderer.setMap(null);
        }
    };

    Routing.prototype.handleRouteResponse = function (response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            this.directionsRenderer.setDirections(response);
        }
    };


    return Routing;
});

