define(['util/EventBus', 'page/map/RangeInput', 'page/map/RenderModel', 'lib/spectrum'], function (EventBus, RangeInput, renderModel) {


    /**
     * Constructor.
     */
    var RenderView = function () {
        this.initOpacitySliders();
        this.initColorInputs();
        EventBus.addEventListener("control-visible-model-changed-event", this.handleVisibilityModelChange, this);
    };

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Initialization
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    RenderView.prototype.initOpacitySliders = function () {

        this.fillOpacitySlider = new RangeInput("#fill-opacity-slider", "#fill-opacity-number-text",
            0.0, 1.0, 0.1, renderModel.fillOpacity);

        this.borderOpacitySlider = new RangeInput("#border-opacity-slider", "#border-opacity-number-text",
            0.0, 1.0, 0.1, renderModel.borderOpacity);

        this.fillOpacitySlider.on("range-change-event", function (event, newOpacity) {
            renderModel.fillOpacity = newOpacity;
            renderModel.fireRenderModelChangeEvent();
        });
        this.borderOpacitySlider.on("range-change-event", function (event, newOpacity) {
            renderModel.borderOpacity = newOpacity;
            renderModel.fireRenderModelChangeEvent();
        });

    };

    RenderView.prototype.initColorInputs = function () {
        $("#fill-color-input").spectrum({
            color: renderModel.fillColor,
            change: jQuery.proxy(this.handleFillColorChange, this)
        });

        $("#border-color-input").spectrum({
            color: renderModel.borderColor,
            change: jQuery.proxy(this.handleBorderColorChange, this)
        });
    };


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Handlers for various UI component changes
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    /**
     * Handle fill color change.
     */
    RenderView.prototype.handleFillColorChange = function (newColor) {
        renderModel.fillColor = "" + newColor;
        renderModel.fireRenderModelChangeEvent();
    };

    /**
     * Handle border color change.
     */
    RenderView.prototype.handleBorderColorChange = function (newColor) {
        renderModel.borderColor = "" + newColor;
        renderModel.fireRenderModelChangeEvent();
    };

    //- - - - - - - - - - - - - - - -- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //
    //- - - - - - - - - - - - - -  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    RenderView.prototype.handleVisibilityModelChange = function (event, controlVisibilityModel) {
        $("#control-row-rendering").toggle(controlVisibilityModel.renderControlVisible);
    };

    return RenderView;

});

