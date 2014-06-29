define(['util/EventBus', 'site/SiteStatus', 'page/map/ControlVisibleModel'], function (EventBus, SiteStatus, controlVisibleModel) {

    /**
     *
     * @constructor
     */
    var Control = function () {
        this.statusPermitCheckbox = $("#status-permit-check");
        this.statusOpenCheckbox = $("#status-open-check");
        this.statusConstructionCheckbox = $("#status-construction-check");

        this.statusOpenCheckbox.click(jQuery.proxy(this.openClicked, this));
        this.statusConstructionCheckbox.click(jQuery.proxy(this.constructionClicked, this));
        this.statusPermitCheckbox.click(jQuery.proxy(this.permitClicked, this));

        this.handleVisibilityModelChange();

        EventBus.addEventListener("status-model-changed-event", this.handleStatusModelChange, this);
        EventBus.addEventListener("control-visible-model-changed-event", this.handleVisibilityModelChange, this)
    };

    Control.prototype.openClicked = function (event) {
        EventBus.dispatch("status-selection-change-event", "target", SiteStatus.OPEN);
    };
    Control.prototype.constructionClicked = function (event) {
        EventBus.dispatch("status-selection-change-event", "target", SiteStatus.CONSTRUCTION);
    };
    Control.prototype.permitClicked = function (event) {
        EventBus.dispatch("status-selection-change-event", "target", SiteStatus.PERMIT);
    };


    function toggleCheckbox(enclosingDiv, newCheckState) {
        var imageSpan = enclosingDiv.find(".glyphicon");
        imageSpan.toggleClass("glyphicon-unchecked", !newCheckState);
        imageSpan.toggleClass("glyphicon-check", newCheckState);
    }

    Control.prototype.handleStatusModelChange = function (event, statusModel) {
        toggleCheckbox(this.statusOpenCheckbox, statusModel.showOpen);
        toggleCheckbox(this.statusConstructionCheckbox, statusModel.showConstruction);
        toggleCheckbox(this.statusPermitCheckbox, statusModel.showPermit);
    };

    Control.prototype.handleVisibilityModelChange = function () {
        $("#control-row-status").toggle(controlVisibleModel.statusControlVisible);
    };

    return Control;


});