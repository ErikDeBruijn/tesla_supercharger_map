define(['util/EventBus'], function (EventBus) {

    var ZoomView = function() {
        this.initZoomToLocationInput();
    };

    ZoomView.prototype.initZoomToLocationInput = function () {
        var zoomView = this;
        $("#zoom-to-location-button").click(jQuery.proxy(this.handleZoomToLocation, this));
        $("#zoom-to-location-input").on('keypress', function (event) {
            if (event.keyCode === 13) {
                zoomView.handleZoomToLocation(event);
            }
        });
    };

    /**
     * Handle zoom to location.
     */
    ZoomView.prototype.handleZoomToLocation = function (event) {
        event.preventDefault();
        var locationText = $("#zoom-to-location-input").val();
        EventBus.dispatch("zoom-to-location-event", "target", locationText);
    };

    return ZoomView;

});