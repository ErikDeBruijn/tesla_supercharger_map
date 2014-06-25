define(['util/EventBus', 'site/SiteIterator', 'site/SiteSorting', 'site/SitePredicates', 'page/map/StatusModel'],
    function (EventBus, SiteIterator, SiteSorting, SitePredicates, statusModel) {

        /**
         *
         * @constructor
         */
        var WayBack = function (googleMap) {
            this.googleMap = googleMap;
            this.lastInfoWindow = null;
            this.index = -1;
            this.wayBackContainer = $("#way-back-container");
            this.delay = 7;

            $("#way-back-close-trigger").click(jQuery.proxy(this.stop, this));
            $("#way-back-fast").click(jQuery.proxy(this.faster, this));
            $("#way-back-slow").click(jQuery.proxy(this.slower, this));

            EventBus.addEventListener("way-back-start-event", this.start, this);
        };

        var MONTH_NAMES = [ "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December" ];


        WayBack.prototype.faster = function (event) {
            if (this.delay > 1) {
                this.delay -= 1;
            }
            $("#way-back-delay").text("delay:" + this.delay);
        };
        WayBack.prototype.slower = function (event) {
            if(this.delay < 10) {
                this.delay += 1;
            }
            $("#way-back-delay").text("delay:" + this.delay);
        };

        /*
         * Stop animation.
         */
        WayBack.prototype.stop = function (event) {
            event.preventDefault();
            this.index = 99999;
            this.wayBackContainer.hide();
        };

        /**
         * Start animation.
         */
        WayBack.prototype.start = function () {
            statusModel.setAllOff();
            statusModel.fireModelChangeEvent();
            EventBus.dispatch("hide-all-control-event");
            this.wayBackContainer.show();
            this.index = -1;
            this.dateDiv = $("#way-back-date");

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
            if (this.lastInfoWindow !== null) {
                this.lastInfoWindow.unbindAll();
                this.lastInfoWindow.close();
            }
            var infoWindow = new google.maps.InfoWindow({
                content: supercharger.displayName
            });
            infoWindow.open(this.googleMap, supercharger.marker);
            this.lastInfoWindow = infoWindow;
            google.maps.event.addListener(infoWindow, 'domready', function () {
                $(".gm-style-iw").next("div").remove();
            });
        };


        WayBack.prototype.doNext = function () {
            this.index++;
            if (this.index < this.superchargers.length) {
                this.showNextDate();
                this.showNextInfoWindow();
                this.showNextMarker();
                setTimeout(jQuery.proxy(this.doNext, this), this.delay * 250);
            }
        };

        return WayBack;


    });