define(['util/EventBus', 'site/SiteStatus'], function (EventBus, SiteStatus) {

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

        EventBus.addEventListener("status-model-changed-event", this.handleStatusModelChange, this);
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


    return Control;


});