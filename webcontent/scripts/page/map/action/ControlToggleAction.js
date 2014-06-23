define(['util/EventBus', 'page/map/ControlVisibleModel'], function (EventBus, controlVisibilityModel) {

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
        controlVisibilityModel.toggleRangeControlVisible();
        controlVisibilityModel.fireChangeEvent();
    };
    Action.prototype.statusToggle = function () {
        controlVisibilityModel.toggleStatusControlVisible();
        controlVisibilityModel.fireChangeEvent();
    };
    Action.prototype.renderToggle = function () {
        controlVisibilityModel.toggleRenderControlVisible();
        controlVisibilityModel.fireChangeEvent();
    };
    Action.prototype.hideAll = function () {
        controlVisibilityModel.setRangeControlVisible(false);
        controlVisibilityModel.setStatusControlVisible(false);
        controlVisibilityModel.setRenderControlVisible(false);
        controlVisibilityModel.fireChangeEvent();
    };

    return Action;

});