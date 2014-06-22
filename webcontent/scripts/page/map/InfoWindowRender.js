define(['util/Objects', 'util/Units', 'util/UnitConversion', 'util/Events', 'page/map/RangeModel'], function (Objects, Units, UnitConversion, Events, rangeModel) {

    /**
     *
     * @constructor
     */
    var Renderer = function (markerP, superchargerP) {
        this.marker = markerP;
        this.supercharger = superchargerP;
        this.infoWindow = null;
        this.showDetails = false;

        var renderer = this;
        jQuery(document).on('click', '.details-trigger', function (event) {
            var eventDetail = Events.eventDetail(event);
            if (parseInt(eventDetail.actionName) === renderer.supercharger.id) {
                renderer.infoWindow.close();
                renderer.toggleDetails();
                renderer.showWindow(true);
            }
        });

    };

    Renderer.prototype.showWindow = function () {
        var windowOptions = { content: this.buildHtmlContent() };
        this.infoWindow = new google.maps.InfoWindow(windowOptions);
        this.infoWindow.open(this.marker.map, this.marker);
        this.marker.infoWindow = this.infoWindow;
    };

    Renderer.prototype.toggleDetails = function () {
        this.showDetails = !this.showDetails;
    };

    Renderer.prototype.buildHtmlContent = function () {
        var popupContent = "<div class='info-window-content'>";
        //
        // Title/Supercharger-name
        //
        popupContent += "<div class='title'>" + this.supercharger.displayName + "</div>" + "";
        //
        // Status: Construction/Permit
        //
        if (this.supercharger.isConstruction()) {
            popupContent += "<div class='construction'>Status: Construction</div>";
        }
        else if (this.supercharger.isPermit()) {
            popupContent += "<div class='permit'>Status: Permit</div>";
        }
        //
        // Street Address
        //
        popupContent += this.supercharger.address.street + "<br/>";

        if (this.showDetails) {
            popupContent += buildDetailsDiv(this.supercharger, rangeModel.range.getDisplayUnit());
        }

        popupContent += buildLinksDiv(this.supercharger);

        popupContent += "</div>";
        return popupContent;
    };

    function buildDetailsDiv(supercharger, displayUnit) {
        var div = "";
        div += "<div class='info-window-details'>";
        div += "<table>";

        // Date Opened
        //
        if (!Objects.isNullOrUndef(supercharger.dateOpened)) {
            div += "<tr><th>Date Opened</th><td>" + supercharger.formatDateOpened() + "</td></tr>";
        }

        // Elevation
        //
        if (!Objects.isNullOrUndef(supercharger.elevation)) {
            var targetUnits = displayUnit.isKilometers() ? Units.M : Units.FT;
            div += "<tr><th>Elevation</th><td>" + supercharger.formatElevation(targetUnits) + "</td></tr>";
        }

        // GPS
        //
        div += "<tr><th>GPS</th><td>" + supercharger.formatLocation() + "</td></tr>";

        //
        // Number of charging stalls
        //
        if (!Objects.isNullOrUndef(supercharger.numStalls)) {
            div += "<tr><th>Stalls</th><td>" + supercharger.formatStalls() + "</td></tr>";
        }

        div += "</table>";
        div += "</div>";
        return div;
    }

    function buildLinksDiv(supercharger) {
        var content = "<div class='links-container'>";

        var linkList = [

            // links that are always present
            buildLinkZoom(supercharger),
            buildLinkCircleToggle(supercharger),
            buildLinkAddToRoute(supercharger),
            buildLinkDetails(supercharger),

            // links that are NOT always present.
            buildLinkURL(supercharger),
            buildLinkDiscussURL(supercharger),
            buildLinkRemoveMarker(supercharger)
        ];

        var count = 1;
        $.each(linkList, function (index, value) {
            if (value !== null) {
                content += value + "";
                if (((count++) % 3 === 0) && (index !== linkList.length - 1)) {
                    content += "<br/>";
                }
            }
        });
        content += "</div>";
        return content;
    }

    function buildLinkZoom(supercharger) {
        return "<a class='zoom-to-site-trigger' href='" + supercharger.id + "'>zoom in</a>";
    }

    function buildLinkCircleToggle(supercharger) {
        var circleOnOffLabel = (Objects.isNotNullOrUndef(supercharger.circle) && supercharger.circle.getVisible()) ? "circle off" : "circle on";
        return "<a class='circle-toggle-trigger' href='" + supercharger.id + "'>" + circleOnOffLabel + "</a>";
    }

    function buildLinkAddToRoute(supercharger) {
        return "<a class='add-to-route-trigger' href='" + supercharger.id + "'>add to route</a>";
    }

    function buildLinkURL(supercharger) {
        if (Objects.isNotNullOrUndef(supercharger.url)) {
            return "<a target='_blank' href='" + supercharger.url + "'>web page</a>";
        }
        return null;
    }

    function buildLinkDiscussURL(supercharger) {
        if (Objects.isNotNullOrUndef(supercharger.urlDiscuss)) {
            return "<a target='_blank' href='" + supercharger.urlDiscuss + "'>discuss</a>";
        }
        return null;
    }

    function buildLinkRemoveMarker(supercharger) {
        if (supercharger.isUserAdded()) {
            return "<a class='marker-toggle-trigger' href='" + supercharger.id + "'>remove</a>";
        }
        return null;
    }

    function buildLinkDetails(supercharger) {
        return "<a class='details-trigger' href='#" + supercharger.id + "'>details</a>";
    }

    return Renderer;

});
