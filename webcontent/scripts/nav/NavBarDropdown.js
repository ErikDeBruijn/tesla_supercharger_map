define(['util/Events'], function (Events) {

    /**
     *
     * @constructor
     */
    var NavBarDropdown = function () {

    };

    //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // Events
    //
    // nav-dropdown-circles-on-event
    // nav-dropdown-circles-off-event
    // nav-dropdown-way-back-event
    //
    //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    NavBarDropdown.prototype.on = function (eventName, callback) {
        $("#navbar-map-dropdown").on(eventName, callback);
    };
    NavBarDropdown.prototype.trigger = function (eventName, customData) {
        $("#navbar-map-dropdown").trigger(eventName, customData);
    };

    //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    NavBarDropdown.prototype.handleAction = function (event) {
        var eventDetail = Events.eventDetail(event);

        eventDetail.link.find(".glyphicon").toggleClass("glyphicon-check");
        eventDetail.link.find(".glyphicon").toggleClass("glyphicon-unchecked");

        if (eventDetail.actionName === "range-menu-item") {
            this.trigger("nav-dropdown-toggle-range-control-event");
        }
        else if (eventDetail.actionName === "status-menu-item") {
            this.trigger("nav-dropdown-toggle-status-control-event");
        }
        else if (eventDetail.actionName === "rendering-menu-item") {
            this.trigger("nav-dropdown-toggle-rendering-control-event");
        }
        else if (eventDetail.actionName === "range-circles-all-off") {
            this.trigger("nav-dropdown-circles-off-event");
        }
        else if (eventDetail.actionName === "range-circles-all-on") {
            this.trigger("nav-dropdown-circles-on-event");
        }
        else if(eventDetail.actionName === "way-back-menu-item") {
            this.trigger("nav-dropdown-way-back-event");
        }
    };


    return NavBarDropdown;

});
