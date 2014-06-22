define(['util/EventBus' ], function (EventBus, SiteStatus) {

    /**
     *
     * @constructor
     */
    var StatusModel = function () {
        /* status control state */
        this.showOpen = true;
        this.showConstruction = true;
        this.showPermit = true;
    };

    StatusModel.prototype.fireModelChangeEvent = function () {
        EventBus.dispatch("status-model-changed-event", "target", this);
    };

    StatusModel.prototype.togglePermit = function () {
        this.setShowPermit(!this.showPermit);
    };
    StatusModel.prototype.toggleConstruction = function () {
        this.setShowConstruction(!this.showConstruction);
    };
    StatusModel.prototype.toggleOpen = function () {
        this.setShowOpen(!this.showOpen);
    };

    StatusModel.prototype.setShowPermit = function (show) {
        this.showPermit = show;
    };
    StatusModel.prototype.setShowConstruction = function (show) {
        this.showConstruction = show;
    };
    StatusModel.prototype.setShowOpen = function (show) {
        this.showOpen = show;
    };


    return new StatusModel();


});