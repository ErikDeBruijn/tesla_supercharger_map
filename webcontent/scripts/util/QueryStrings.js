define(['util/Strings', 'util/Objects'], function (Strings, Objects) {

    var QueryStrings = {};

    QueryStrings.DEFAULT_CENTER = { latitude: 38.0, longitude: -96.5};
    QueryStrings.DEFAULT_ZOOM = 5;
    QueryStrings.DEFAULT_PAGE = "map";
    QueryStrings.DEFAULT_CONTROLS = "range,status";

    /**
     * Center
     */
    QueryStrings.getCenter = function () {
        var value = getByName("Center");
        if (value !== null) {
            var lat = parseFloat(value.split(",")[0]);
            var lng = parseFloat(value.split(",")[1]);
            if (Objects.isNumber(lat) && Objects.isNumber(lng)) {
                return {latitude: lat, longitude: lng};
            }
        }
        return QueryStrings.DEFAULT_CENTER;
    };

    /**
     * Zoom
     */
    QueryStrings.getZoom = function () {
        var initialZoom = getByName("Zoom");
        if ((initialZoom) && (!isNaN(initialZoom))) {
            return parseInt(initialZoom);
        }
        return QueryStrings.DEFAULT_ZOOM;
    };

    /**
     * PAGE
     */
    QueryStrings.getPage = function () {
        var PAGE_OPTIONS = ['map', 'data', 'charts', 'changes', 'about'];
        var page = getByName("Page");
        var pageLower = page !== null ? page.toLowerCase() : "";
        if (PAGE_OPTIONS.indexOf(pageLower) >= 0) {
            return pageLower;
        }
        return QueryStrings.DEFAULT_PAGE;
    };

    /**
     * CONTROLS
     */
    QueryStrings.getControls = function () {
        var controls = getByName("Controls");
        return controls === null ? QueryStrings.DEFAULT_CONTROLS : controls.toLowerCase();
    };

    /**
     * Wayback
     */
    QueryStrings.getWayBack = function () {
        return "start" === getByName("wayback");
    };

    QueryStrings.getRangeMi = function () {
        return getByName("RangeMi");
    };

    QueryStrings.getRangeKm = function () {
        return getByName("RangeKm");
    };

    /**
     * Get a Query (URL) parameter by name (this is case insensitive)
     */
    function getByName(parameterName) {
        var paramRegex = new RegExp('[?|&]' + parameterName + '=' + '([^&;]+?)(&|#|;|$)', 'i');
        var paramValueArray = (paramRegex.exec(location.search) || [, ""]);
        var encodedParamValue = paramValueArray[1].replace(/\+/g, '%20');
        return decodeURIComponent(encodedParamValue) || null;
    }

    return QueryStrings;
});