define(['util/EventBus'], function (EventBus) {

    /**
     *
     * @constructor
     */
    var Action = function (controlSate) {
        this.controlState = controlSate;

        EventBus.addEventListener("toggle-range-control-event", this.rangeToggle, this);
        EventBus.addEventListener("toggle-status-control-event", this.statusToggle, this);
        EventBus.addEventListener("toggle-render-control-event", this.renderToggle, this);
        EventBus.addEventListener("hide-all-control-event", this.hideAll, this);
    };

    Action.prototype.rangeToggle = function () {
        this.controlState.toggleRangeControlVisible();
        this.controlState.fireChangeEvent();
    };
    Action.prototype.statusToggle = function () {
        this.controlState.toggleStatusControlVisible();
        this.controlState.fireChangeEvent();
    };
    Action.prototype.renderToggle = function () {
        this.controlState.toggleRenderControlVisible();
        this.controlState.fireChangeEvent();
    };
    Action.prototype.hideAll = function () {
        this.controlState.setRangeControlVisible(false);
        this.controlState.setStatusControlVisible(false);
        this.controlState.setRenderControlVisible(false);
        this.controlState.fireChangeEvent();
    };

    return Action;

});