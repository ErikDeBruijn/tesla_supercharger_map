define(['util/Events', 'util/EventBus'], function (Events, EventBus) {

    /**
     *
     * @constructor
     */
    var NavBarDropdown = function () {
        this.rangeControlMenuItem = $("#range-menu-item").find(".glyphicon");
        this.statusControlMenuItem = $("#status-menu-item").find(".glyphicon");
        this.renderControlMenuItem = $("#rendering-menu-item").find(".glyphicon");

        EventBus.addEventListener("control-model-changed-event", this.handleControlModelChange, this);
    };

    NavBarDropdown.prototype.handleAction = function (event) {
        var eventDetail = Events.eventDetail(event);

        if (eventDetail.actionName === "range-menu-item") {
            EventBus.dispatch("toggle-range-control-event");
        }
        else if (eventDetail.actionName === "status-menu-item") {
            EventBus.dispatch("toggle-status-control-event");
        }
        else if (eventDetail.actionName === "rendering-menu-item") {
            EventBus.dispatch("toggle-render-control-event");
        }
        else if (eventDetail.actionName === "range-circles-all-off") {
            EventBus.dispatch("circles-all-off-event");
        }
        else if (eventDetail.actionName === "range-circles-all-on") {
            EventBus.dispatch("circles-all-on-event");
        }
        else if (eventDetail.actionName === "way-back-menu-item") {
            EventBus.dispatch("way-back-start-event");
        }
    };

    NavBarDropdown.prototype.handleControlModelChange = function (event, controlModel) {
        checkboxUpdate(this.rangeControlMenuItem, controlModel.rangeControlVisible);
        checkboxUpdate(this.statusControlMenuItem, controlModel.statusControlVisible);
        checkboxUpdate(this.renderControlMenuItem, controlModel.renderControlVisible);
    };

    function checkboxUpdate(menuItem, checked) {
        if (checked && !menuItem.hasClass("glyphicon-check")) {
            menuItem.addClass("glyphicon-check");
            menuItem.removeClass("glyphicon-unchecked");
        }
        if (!checked && !menuItem.hasClass("glyphicon-unchecked")) {
            menuItem.addClass("glyphicon-unchecked");
            menuItem.removeClass("glyphicon-check");
        }
    }


    return NavBarDropdown;

});
