define(['util/EventBus', 'site/SiteStatus', 'page/map/StatusModel'], function (EventBus, SiteStatus, statusModel) {

    /**
     *
     * @constructor
     */
    var Action = function () {
        EventBus.addEventListener("status-selection-change-event", this.statusSelectionChange, this);
    };

    Action.prototype.statusSelectionChange = function (event, siteStatus) {
        if (siteStatus === SiteStatus.PERMIT) {
            statusModel.togglePermit();
        }
        if (siteStatus === SiteStatus.CONSTRUCTION) {
            statusModel.toggleConstruction();
        }
        if (siteStatus === SiteStatus.OPEN) {
            statusModel.toggleOpen();
        }
        statusModel.fireModelChangeEvent();
    };

    return Action;

});