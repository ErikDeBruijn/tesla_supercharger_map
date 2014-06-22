define(['util/EventBus', 'page/map/RangeModel'], function (EventBus, rangeModel) {

    /**
     *
     * @constructor
     */
    var Action = function (mapView) {
        this.mapView = mapView;

        EventBus.addEventListener("circles-all-on-event", this.circlesOn, this);
        EventBus.addEventListener("circles-all-off-event", this.circlesOff, this);

    };

    Action.prototype.circlesOn = function () {
        if (rangeModel.range.getCurrent() === 0) {
            rangeModel.range.setCurrent(50);
            rangeModel.fireChangeEvent();
        }
        this.mapView.setAllRangeCircleVisibility(true);
    };

    Action.prototype.circlesOff = function () {
        this.mapView.setAllRangeCircleVisibility(false);
    };

    return Action;

});