define(['util/EventBus', 'page/map/ControlState'], function (EventBus, controlState) {

    /**
     *
     * @constructor
     */
    var Action = function () {
        EventBus.addEventListener("toggle-range-control-event", this.rangeToggle, this);
        EventBus.addEventListener("toggle-status-control-event", this.statusToggle, this);
        EventBus.addEventListener("toggle-render-control-event", this.renderToggle, this);
        EventBus.addEventListener("hide-all-control-event", this.hideAll, this);
    };

    Action.prototype.rangeToggle = function () {
        controlState.toggleRangeControlVisible();
        controlState.fireChangeEvent();
    };
    Action.prototype.statusToggle = function () {
        controlState.toggleStatusControlVisible();
        controlState.fireChangeEvent();
    };
    Action.prototype.renderToggle = function () {
        controlState.toggleRenderControlVisible();
        controlState.fireChangeEvent();
    };
    Action.prototype.hideAll = function () {
        controlState.setRangeControlVisible(false);
        controlState.setStatusControlVisible(false);
        controlState.setRenderControlVisible(false);
        controlState.fireChangeEvent();
    };

    return Action;

});