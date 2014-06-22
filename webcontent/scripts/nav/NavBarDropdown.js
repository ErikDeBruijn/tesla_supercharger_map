define(['util/Events', 'util/EventBus'], function (Events, EventBus) {

    /**
     *
     * @constructor
     */
    var NavBarDropdown = function () {
        EventBus.addEventListener("control-state-changed-event", this.handleControlStateChange, this);
    };

    NavBarDropdown.prototype.handleAction = function (event) {
        var eventDetail = Events.eventDetail(event);

        eventDetail.link.find(".glyphicon").toggleClass("glyphicon-check");
        eventDetail.link.find(".glyphicon").toggleClass("glyphicon-unchecked");

        if (eventDetail.actionName === "range-menu-item") {
            EventBus.dispatch("nav-dropdown-toggle-range-control-event");
        }
        else if (eventDetail.actionName === "status-menu-item") {
            EventBus.dispatch("nav-dropdown-toggle-status-control-event");
        }
        else if (eventDetail.actionName === "rendering-menu-item") {
            EventBus.dispatch("nav-dropdown-toggle-render-control-event");
        }
        else if (eventDetail.actionName === "range-circles-all-off") {
            EventBus.dispatch("nav-dropdown-circles-off-event");
        }
        else if (eventDetail.actionName === "range-circles-all-on") {
            EventBus.dispatch("nav-dropdown-circles-on-event");
        }
        else if (eventDetail.actionName === "way-back-menu-item") {
            EventBus.dispatch("nav-dropdown-way-back-event");
        }
    };

    NavBarDropdown.prototype.handleControlStateChange = function () {

    };

    return NavBarDropdown;

});
