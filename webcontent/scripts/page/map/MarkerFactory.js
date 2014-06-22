define(['page/map/InfoWindowRender', 'lib/jquery.browser'], function (InfoWindowRender, browser) {

    /**
     *
     * @constructor
     */
    var MarkerFactory = function (googleMap, controlState) {
        this.googleMap = googleMap;
        this.controlState = controlState;
    };

    /**
     * Creates a new marker for the given supercharger. Sets up click listener to display info-window when clicked.
     */
    MarkerFactory.prototype.createMarker = function (supercharger) {
        var markerOptions = {
            position: supercharger.location,
            map: this.googleMap,
            title: supercharger.displayName,
            icon: {
                url: supercharger.status.iconUrl,
                anchor: supercharger.isConstruction() ? null : { x: 8, y: 8 }
            }
        };

        /**
         * The animation seems to crash Safari on iOS 7.0.  Would render oddly (draw markers, then animate) on android.
         */
        if (!$.browser.mobile) {
            markerOptions.animation = google.maps.Animation.DROP;
        }

        var marker = new google.maps.Marker(markerOptions);

        google.maps.event.addListener(marker, 'click', function () {
            var infoWindowRenderer = new InfoWindowRender(marker, supercharger);
            infoWindowRenderer.showWindow();
        });

        return marker;
    };

    return MarkerFactory;

});