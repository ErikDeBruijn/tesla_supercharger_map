define(['util/EventBus', 'site/SiteStatus'], function (EventBus, SiteStatus) {

    /**
     *
     * @constructor
     */
    var Action = function (controlSate) {
        this.controlState = controlSate;

        EventBus.addEventListener("status-selection-change-event", this.statusSelectionChange, this);
    };

    Action.prototype.statusSelectionChange = function (event, siteStatus) {
        if (siteStatus === SiteStatus.PERMIT) {
            this.controlState.showPermit = !this.controlState.showPermit;
        }
        if (siteStatus === SiteStatus.CONSTRUCTION) {
            this.controlState.showConstruction = !this.controlState.showConstruction;
        }
        if (siteStatus === SiteStatus.OPEN) {
            this.controlState.showOpen = !this.controlState.showOpen;
        }
        this.controlState.fireChangeEvent();
        //TODO: mapView.redraw(true);
    };

    return Action;

});