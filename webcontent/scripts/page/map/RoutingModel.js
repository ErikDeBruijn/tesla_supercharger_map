define(['util/EventBus'], function (EventBus) {

    /**
     *
     * @constructor
     */
    var RoutingModel = function () {
        this.waypointList = [];
    };

    RoutingModel.prototype.fireChangeEvent = function () {
        EventBus.dispatch("route-model-changed-event");
    };

    RoutingModel.prototype.getWaypoints = function () {
        return this.waypointList;
    };

    RoutingModel.prototype.addWaypoint = function (waypoint) {
        this.waypointList.push(waypoint);
        this.fireChangeEvent();
    };

    RoutingModel.prototype.removeWaypoint = function (index) {
        this.waypointList.splice(index, 1);
        this.fireChangeEvent();
    };

    RoutingModel.prototype.size = function (index) {
        return this.waypointList.length;
    };

    RoutingModel.prototype.getFirstLatLng = function (index) {
        return this.waypointList[0];
    };

    RoutingModel.prototype.getLastLatLng = function (index) {
        return this.waypointList[this.size() - 1];
    };

    RoutingModel.prototype.getBetweenLatLngList = function () {
        var wayPointLatLngList = [];
        var INDEX_LAST = this.waypointList.length - 1;
        var INDEX_FIRST = 0;
        jQuery.each(this.waypointList, function (index, value) {
            if ((index !== INDEX_FIRST) && (index !== INDEX_LAST)) {
                wayPointLatLngList.push({ location: value.latLng, stopover: true});
            }
        });
        return wayPointLatLngList;
    };

    return new RoutingModel();

});