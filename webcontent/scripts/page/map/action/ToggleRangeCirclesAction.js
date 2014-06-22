define(['util/EventBus'], function (EventBus) {

    /**
     *
     * @constructor
     */
    var Action = function (controlView, mapView) {
        this.controlView = controlView;
        this.mapView = mapView;

        EventBus.addEventListener("circles-all-on-event", this.circlesOn, this);
        EventBus.addEventListener("circles-all-off-event", this.circlesOff, this);

    };

    Action.prototype.circlesOn = function () {
        if (this.controlView.controlState.range.getCurrent() === 0) {
            this.controlView.getRangeSlider().setValue(50);
            this.mapView.redraw(false);
        }
        this.mapView.setAllRangeCircleVisibility(true);
    };

    Action.prototype.circlesOff = function () {
        this.mapView.setAllRangeCircleVisibility(false);
    };

    return Action;

});