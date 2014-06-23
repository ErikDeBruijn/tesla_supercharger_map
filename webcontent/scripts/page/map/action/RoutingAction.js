define(['util/EventBus', 'page/map/RoutingModel'], function (EventBus, routingModel) {

    /**
     *
     * @constructor
     */
    var RoutingAction = function (googleMap) {
        this.googleMap = googleMap;
        this.directionsService = new google.maps.DirectionsService();

        this.directionsRenderer = new google.maps.DirectionsRenderer({
            map: googleMap,
            panel: $("#route-directions-panel").get(0),
            preserveViewport: true,
            suppressMarkers: true,
            draggable: true
        });

        EventBus.addEventListener("route-model-changed-event", this.handleModelChange, this);
        EventBus.addEventListener("route-added-event", this.handleAddRouteEvent, this);
    };

    RoutingAction.prototype.handleAddRouteEvent = function (event, routingWaypoint) {
        routingModel.addWaypoint(routingWaypoint);
    };

    RoutingAction.prototype.handleModelChange = function () {
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

    RoutingAction.prototype.handleRouteResponse = function (response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            this.directionsRenderer.setDirections(response);
        }
    };


    return RoutingAction;
});

