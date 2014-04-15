define(['util/Unit'], function (Unit) {

    /**
     * @constructor always takes *meters* as the initial magnitude, but the initial displayUnit value can be either unit.
     */
    var Range = function (rangeMetersIn, displayUnit) {
        this.rangeMeters = rangeMetersIn;
        this.displayUnit = displayUnit;
    };

    Range.MILES_MIN = 0;
    Range.MILES_MAX = 300;
    Range.METERS_PER_MILE = 1609.34;
    Range.METERS_PER_KM = 1000.0;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    Range.prototype.getCurrent = function () {
        if (this.displayUnit.isMiles()) {
            return Range.metersToMiles(this.rangeMeters);
        } else {
            return Range.metersToKilometers(this.rangeMeters);
        }
    };
    Range.prototype.setCurrent = function (newRange) {
        if (this.displayUnit.isMiles()) {
            this.rangeMeters = Range.milesToMeters(newRange);
        } else {
            this.rangeMeters = Range.kilometersToMeters(newRange);
        }
    };

    Range.prototype.getMin = function () {
        if (this.displayUnit.isMiles()) {
            return Range.MILES_MIN;
        } else {
            return Range.milesToKilometers(Range.MILES_MIN);
        }
    };

    Range.prototype.getMax = function () {
        if (this.displayUnit.isMiles()) {
            return Range.MILES_MAX;
        } else {
            return Range.milesToKilometers(Range.MILES_MAX);
        }
    };

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// getters/setters
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    Range.prototype.getRangeMeters = function () {
        return this.rangeMeters;
    };

    Range.prototype.setUnit = function (newUnit) {
        this.displayUnit = newUnit;
    };

    Range.prototype.getDisplayUnit = function () {
        return this.displayUnit;
    };


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// static methods
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    /**
     * CONVERT: miles to meters
     */
    Range.milesToMeters = function (miles) {
        return Math.round(Range.METERS_PER_MILE * miles);
    };

    /**
     * CONVERT: miles to kilometers
     */
    Range.milesToKilometers = function (miles) {
        return Math.round(Range.METERS_PER_MILE * miles / Range.METERS_PER_KM);
    };
    /**
     * CONVERT: meters to miles
     */
    Range.metersToMiles = function (meters) {
        return Math.round(meters / Range.METERS_PER_MILE);
    };

    /**
     * CONVERT: meters to kilometers
     */
    Range.metersToKilometers = function (meters) {
        return Math.round(meters / Range.METERS_PER_KM);
    };

    /**
     * CONVERT: kilometers to meters
     */
    Range.kilometersToMeters = function (kilometers) {
        return Math.round(kilometers * Range.METERS_PER_KM);
    };

    return Range;
});