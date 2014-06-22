define(['util/EventBus', 'util/Units', 'page/map/Range', 'util/QueryStrings'], function (EventBus, Units, Range, QueryStrings) {

    /**
     *
     * @constructor
     */
    var RangeModel = function () {

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

    RangeModel.prototype.fireChangeEvent = function () {
        EventBus.dispatch("range-model-changed-event");
    };


    return new RangeModel();


});