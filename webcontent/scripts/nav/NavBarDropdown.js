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

        if (eventDetail.actionName === "range") {
            this.handleRangeAction();
        }
        else if (eventDetail.actionName === "status") {
            this.handleStatusAction();
        }
        else if (eventDetail.actionName === "rendering") {
            this.handleRenderingAction();
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

    NavBarDropdown.prototype.handleRangeAction = function () {
        $("#control-row-one").children().eq(0).toggle();
    };

    NavBarDropdown.prototype.handleStatusAction = function () {
        $("#control-row-one").children().eq(1).toggle();
    };

    NavBarDropdown.prototype.handleRenderingAction = function () {
        $("#control-row-rendering").toggle();
    };

    return NavBarDropdown;

});
