define(['util/EventBus'], function (EventBus) {

    /**
     *
     * @constructor
     */
    var ControlState = function () {
        this.fillOpacity = 0.15;
        this.fillColor = "#86c4ec";

        this.borderOpacity = 0.3;
        this.borderColor = "#181fe7";

        this.rangeControlVisible = true;
        this.statusControlVisible = true;
        this.renderControlVisible = false;
    };

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    ControlState.prototype.fireChangeEvent = function () {
        EventBus.dispatch("control-model-changed-event", "target", this);
    };

    ControlState.prototype.toggleRangeControlVisible = function () {
        this.setRangeControlVisible(!this.rangeControlVisible);
    };
    ControlState.prototype.toggleStatusControlVisible = function () {
        this.setStatusControlVisible(!this.statusControlVisible);
    };
    ControlState.prototype.toggleRenderControlVisible = function () {
        this.setRenderControlVisible(!this.renderControlVisible);
    };

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    ControlState.prototype.setRangeControlVisible = function (visible) {
        this.rangeControlVisible = visible;
    };
    ControlState.prototype.setStatusControlVisible = function (visible) {
        this.statusControlVisible = visible;
    };
    ControlState.prototype.setRenderControlVisible = function (visible) {
        this.renderControlVisible = visible;
    };


    return ControlState;

});