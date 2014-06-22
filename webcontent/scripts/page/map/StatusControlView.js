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

        EventBus.addEventListener("control-state-changed-event", this.handleControlStateChange, this);
    };

    Control.prototype.openClicked = function (event) {
        EventBus.dispatch("status-selection-change-event", "", SiteStatus.OPEN);
    };
    Control.prototype.constructionClicked = function (event) {
        EventBus.dispatch("status-selection-change-event", "", SiteStatus.CONSTRUCTION);
    };
    Control.prototype.permitClicked = function (event) {
        EventBus.dispatch("status-selection-change-event", "", SiteStatus.PERMIT);
    };


    function toggleCheckbox(enclosingDiv, newCheckState) {
        var imageSpan = enclosingDiv.find(".glyphicon");
        imageSpan.toggleClass("glyphicon-unchecked", !newCheckState);
        imageSpan.toggleClass("glyphicon-check", newCheckState);
    }

    Control.prototype.handleControlStateChange = function (event) {
        var controlState = event.target;
        toggleCheckbox(this.statusOpenCheckbox, controlState.showOpen);
        toggleCheckbox(this.statusConstructionCheckbox, controlState.showConstruction);
        toggleCheckbox(this.statusPermitCheckbox, controlState.showPermit);
    };


    return Control;


});