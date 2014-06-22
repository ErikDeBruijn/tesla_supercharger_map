define(['util/EventBus', 'site/SiteIterator', 'site/SiteSorting', 'site/SitePredicates'],
    function (EventBus, SiteIterator, SiteSorting, SitePredicates) {

        /**
         *
         * @constructor
         */
        var WayBack = function (googleMap) {
            this.googleMap = googleMap;
            this.dateDiv = $("#way-back-date");
            this.lastInfoWindow = null;
            this.index = -1;

            EventBus.addEventListener("way-back-start-event", this.start, this);
        };

        var MONTH_NAMES = [ "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December" ];

        /**
         *
         */
        WayBack.prototype.start = function () {
            // TODO: turn of construction and permit supercharges.
            // TODO: HIDE RANGE CONTROLS.
            // TODO: HIDE ALL RANGE CIRCLES
            // TODO: zoom?


            $(".layout-header")
                .append("<div style='height: 3em; background: black; width: 100%; vertical-align: middle'>" +
                    "<div id='way-back-date' style='font-weight: bold; color: white; text-align: center; font-size: 2em'>" +
                    "</div>" +
                    "</div>"
            );

            this.superchargers = new SiteIterator()
                .withSort(SiteSorting.BY_OPENED_DATE)
                .withPredicate(SitePredicates.IS_OPEN_AND_COUNTED)
                .toArray();

            $.each(this.superchargers, function (index, site) {
                site.marker.setVisible(false);
            });
            this.doNext();
        };

        WayBack.prototype.showNextDate = function () {
            var supercharger = this.superchargers[this.index];
            var dateOpened = supercharger.dateOpened;
            this.dateDiv.html(
                    dateOpened.getFullYear() + "&nbsp;" + MONTH_NAMES[dateOpened.getMonth()]
            );
        };

        WayBack.prototype.showNextMarker = function () {
            var supercharger = this.superchargers[this.index];
            supercharger.marker.setVisible(true);
        };

        WayBack.prototype.showNextInfoWindow = function () {
            var supercharger = this.superchargers[this.index];
            if (this.lastInfoWindow != null) {
                this.lastInfoWindow.close();
            }
            var infoWindow = new google.maps.InfoWindow({
                content: supercharger.displayName
            });
            infoWindow.open(this.googleMap, supercharger.marker);
            this.lastInfoWindow = infoWindow;
        };


        WayBack.prototype.doNext = function () {
            this.index++;
            if (this.index < this.superchargers.length - 1) {
                this.showNextDate();
                this.showNextInfoWindow();
                setTimeout(jQuery.proxy(this.showNextMarker, this), 350);
                setTimeout(jQuery.proxy(this.doNext, this), 1350);
            }
        };

        return WayBack;


    });