define(['util/EventBus'], function (EventBus) {

    /**
     *
     * @constructor
     */
    var Action = function (controlView) {
        this.controlView = controlView;

        EventBus.addEventListener("nav-dropdown-toggle-range-control-event", this.rangeToggle, this);
        EventBus.addEventListener("nav-dropdown-toggle-status-control-event", this.statusToggle, this);
        EventBus.addEventListener("nav-dropdown-toggle-render-control-event", this.renderToggle, this);
    };

    Action.prototype.rangeToggle = function () {
        this.controlView.toggleRangeControlVisibility();
    };
    Action.prototype.statusToggle = function () {
        this.controlView.toggleStatusControlVisibility();
    };
    Action.prototype.renderToggle = function () {
        this.controlView.toggleRenderingControlVisibility();
    };

    return Action;

});