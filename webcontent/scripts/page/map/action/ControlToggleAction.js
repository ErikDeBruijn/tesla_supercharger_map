define(['util/EventBus'], function (EventBus) {

    /**
     *
     * @constructor
     */
    var Action = function (controlSate) {
        this.controlState = controlSate;

        EventBus.addEventListener("nav-dropdown-toggle-range-control-event", this.rangeToggle, this);
        EventBus.addEventListener("nav-dropdown-toggle-status-control-event", this.statusToggle, this);
        EventBus.addEventListener("nav-dropdown-toggle-render-control-event", this.renderToggle, this);
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

    return Action;

});