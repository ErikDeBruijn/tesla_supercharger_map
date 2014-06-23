define(['util/EventBus'], function (EventBus) {

    /**
     *
     * @constructor
     */
    var ControlState = function () {
        this.fillOpacity = 0.15;
        this.fillColor = "#86c4ec";

        this.borderOpacity = 0.3;
        this.borderColor = "#181fe7";
    };

    ControlState.prototype.fireRenderModelChangeEvent = function () {
        EventBus.dispatch("render-model-changed-event");
    };

    return new ControlState();

});