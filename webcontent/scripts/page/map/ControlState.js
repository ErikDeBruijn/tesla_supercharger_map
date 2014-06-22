define(['util/EventBus', 'page/map/Range', 'util/QueryStrings', 'util/Units'], function (EventBus, Range, QueryStrings, Units) {

    /**
     *
     * @constructor
     */
    var ControlState = function () {

        this.initRange();

        this.fillOpacity = 0.15;
        this.fillColor = "#86c4ec";

        this.borderOpacity = 0.3;
        this.borderColor = "#181fe7";

        /* status control state */
        this.showOpen = true;
        this.showConstruction = true;
        this.showPermit = true;

        this.rangeControlVisible = true;
        this.statusControlVisible = true;
        this.renderControlVisible = false;
    };

    ControlState.prototype.initRange = function () {
        var rangeMi = QueryStrings.getByName("RangeMi");
        var rangeKm = QueryStrings.getByName("RangeKm");

        if (rangeMi) {
            this.range = new Range(Range.milesToMeters(rangeMi), Units.MI);
        } else if (rangeKm) {
            this.range = new Range(Range.kilometersToMeters(rangeKm), Units.KM);
        } else {
            this.range = new Range(0, Units.MI);
        }
    };

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    ControlState.prototype.fireChangeEvent = function () {
        EventBus.dispatch("control-state-changed-event", this); // not sure what second arg does here.
    };

    ControlState.prototype.toggleRangeControlVisible = function () {
        this.setRangeControlVisible(!this.rangeControlVisible);
    };
    ControlState.prototype.toggleStatusControlVisible = function () {
        this.setStatusControlVisible(!this.statusControlVisible);
    };
    ControlState.prototype.toggleRenderControlVisible = function () {
        this.setRenderControlVisible(!this.renderControlVisible);
    };

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    ControlState.prototype.setRangeControlVisible = function (visible) {
        this.rangeControlVisible = visible;
    };
    ControlState.prototype.setStatusControlVisible = function (visible) {
        this.statusControlVisible = visible;
    };
    ControlState.prototype.setRenderControlVisible = function (visible) {
        this.renderControlVisible = visible;
    };


    return ControlState;

});