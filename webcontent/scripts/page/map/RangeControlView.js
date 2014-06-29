define(['util/EventBus', 'util/Units', 'page/map/RangeInput', 'page/map/RangeModel'], function (EventBus, Units, RangeInput, rangeModel) {

    /**
     *
     * @constructor
     */
    var RangeControlView = function () {
        this.initRangeControl();
        this.initRangeUnitControl();

        EventBus.addEventListener("range-model-changed-event", this.handleModelChange, this);
        EventBus.addEventListener("control-visible-model-changed-event", this.handleVisibilityModelChange, this)
    };

    /**
     * Initialize range control.
     */
    RangeControlView.prototype.initRangeControl = function () {
        this.rangeSlider = new RangeInput("#range-slider", "#range-number-text",
            rangeModel.range.getMin(),
            rangeModel.range.getMax(),
            5,
            rangeModel.range.getCurrent());

        this.rangeSlider.on("range-change-event", function (event, newRange) {
            rangeModel.range.setCurrent(newRange);
            rangeModel.fireChangeEvent();
        });
    };

    RangeControlView.prototype.initRangeUnitControl = function () {
        var control = this;
        var miUnitLabel = $("#range-unit-mi-label");
        var kmUnitLabel = $("#range-unit-km-label");
        miUnitLabel.click(function () {
            control.handleDistanceUnit(Units.MI);
        });
        kmUnitLabel.click(function () {
            control.handleDistanceUnit(Units.KM);
        });
        if (rangeModel.range.getDisplayUnit().isMiles()) {
            miUnitLabel.addClass("active");
            kmUnitLabel.removeClass("active");
        } else {
            miUnitLabel.removeClass("active");
            kmUnitLabel.addClass("active");
        }
    };

    /**
     * Handle changes to distance unit.
     */
    RangeControlView.prototype.handleDistanceUnit = function (newUnit) {
        rangeModel.range.setUnit(newUnit);
        this.initRangeControl();
    };

    RangeControlView.prototype.handleModelChange = function () {
        this.rangeSlider.setValue(rangeModel.range.getCurrent());
    };

    RangeControlView.prototype.handleVisibilityModelChange = function (event, controlVisibilityModel) {
        $("#control-row-range").toggle(controlVisibilityModel.rangeControlVisible);
    };

    return RangeControlView;

});