define(['util/EventBus'], function (EventBus) {

    /**
     *
     * @constructor
     */
    var ZoomToLocationAction = function (googleMap) {
        this.googleMap = googleMap;
        EventBus.addEventListener("zoom-to-location-event", this.zoomToLocation, this);
    };

    ZoomToLocationAction.prototype.zoomToLocation = function (event, locationText) {
        var geocodeService = new google.maps.Geocoder();
        var request = { address: locationText};
        geocodeService.geocode(request, jQuery.proxy(this.zoomToLocationResponseHandler, this));
    };

    ZoomToLocationAction.prototype.zoomToLocationResponseHandler = function (resultArray, status) {
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

    return ZoomToLocationAction;


});