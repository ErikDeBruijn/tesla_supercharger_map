define(['util/EventBus', 'page/map/RangeInput', 'page/map/ControlState', 'lib/spectrum'], function (EventBus, RangeInput, controlState) {


    /**
     * Constructor.
     */
    var ControlView = function () {
        this.initOpacitySliders();
        this.initColorInputs();
        EventBus.addEventListener("control-visible-model-changed-event", this.handleControlVisibilityChange, this);
    };

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Initialization
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    ControlView.prototype.initOpacitySliders = function () {

        this.fillOpacitySlider = new RangeInput("#fill-opacity-slider", "#fill-opacity-number-text",
            0.0, 1.0, 0.1, controlState.fillOpacity);

        this.borderOpacitySlider = new RangeInput("#border-opacity-slider", "#border-opacity-number-text",
            0.0, 1.0, 0.1, controlState.borderOpacity);

        this.fillOpacitySlider.on("range-change-event", function (event, newOpacity) {
            controlState.fillOpacity = newOpacity;
            controlState.fireRenderModelChangeEvent();
        });
        this.borderOpacitySlider.on("range-change-event", function (event, newOpacity) {
            controlState.borderOpacity = newOpacity;
            controlState.fireRenderModelChangeEvent();
        });

    };

    ControlView.prototype.initColorInputs = function () {
        $("#fill-color-input").spectrum({
            color: controlState.fillColor,
            change: jQuery.proxy(this.handleFillColorChange, this)
        });

        $("#border-color-input").spectrum({
            color: controlState.borderColor,
            change: jQuery.proxy(this.handleBorderColorChange, this)
        });
    };


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Handlers for various UI component changes
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    /**
     * Handle fill color change.
     */
    ControlView.prototype.handleFillColorChange = function (newColor) {
        controlState.fillColor = "" + newColor;
        controlState.fireRenderModelChangeEvent();
    };

    /**
     * Handle border color change.
     */
    ControlView.prototype.handleBorderColorChange = function (newColor) {
        controlState.borderColor = "" + newColor;
        controlState.fireRenderModelChangeEvent();
    };

    //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //
    //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    ControlView.prototype.handleControlVisibilityChange = function (event, controlVisibilityModel) {
        var rowOneChildren = $("#control-row-one").children();
        rowOneChildren.eq(0).toggle(controlVisibilityModel.rangeControlVisible);
        rowOneChildren.eq(1).toggle(controlVisibilityModel.statusControlVisible);
        $("#control-row-rendering").toggle(controlVisibilityModel.renderControlVisible);
    };

    return ControlView;

});

