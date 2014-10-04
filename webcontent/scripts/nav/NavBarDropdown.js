define(['util/Events', 'util/EventBus'], function (Events, EventBus) {

    /**
     *
     * @constructor
     */
    var NavBarDropdown = function () {
        this.rangeControlMenuItem = $("#range-menu-item").find(".glyphicon");
        this.statusControlMenuItem = $("#status-menu-item").find(".glyphicon");
        this.renderControlMenuItem = $("#rendering-menu-item").find(".glyphicon");

        EventBus.addEventListener("control-visible-model-changed-event", this.handleControlVisibilityChange, this);
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
        else if (eventDetail.actionName === "link-menu-item") {
            EventBus.dispatch("set-mapview-link-event");
            showLinkModal();
        }
        else if (eventDetail.actionName === "way-back-menu-item") {
            EventBus.dispatch("way-back-start-event");
        }
    };

    NavBarDropdown.prototype.handleControlVisibilityChange = function (event, controlVisibilityModel) {
        checkboxUpdate(this.rangeControlMenuItem, controlVisibilityModel.rangeControlVisible);
        checkboxUpdate(this.statusControlMenuItem, controlVisibilityModel.statusControlVisible);
        checkboxUpdate(this.renderControlMenuItem, controlVisibilityModel.renderControlVisible);
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

    /**
     * show the modal with a link to the current view.
     */
    function showLinkModal () {
        var linkDialog = $("#link-dialog");
        var linkInput = $("#link-input");
        var goButton = $("#go-to-button");

        // Go to URL when "Go to! button is pressed"
        goButton.on('click',function() {
            window.location.href = linkInput.val();
        });

        // Focus on input field after dialog is shown 
        // and select its contents for quick copy & paste
        linkDialog.on('shown.bs.modal', function (e) {
            linkInput.focus().select();

        });
        // Clear input field after any type of dialog close
        linkDialog.on('hidden.bs.modal', function (e) {
            linkInput.val("");
        });

        linkDialog.modal();
    }

    return NavBarDropdown;

});
