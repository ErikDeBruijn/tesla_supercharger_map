define(['util/EventBus'], function (EventBus) {

    /**
     *
     * @constructor
     */
    var ControlState = function () {
        this.rangeControlVisible = true;
        this.statusControlVisible = true;
        this.renderControlVisible = false;
    };

    ControlState.prototype.fireChangeEvent = function () {
        EventBus.dispatch("control-visible-model-changed-event", "target", this);
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


    return new ControlState();

});