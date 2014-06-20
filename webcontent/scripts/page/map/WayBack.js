define(['site/SiteIterator', 'site/SiteSorting', 'site/SitePredicates'],
    function (SiteIterator, SiteSorting, SitePredicates) {

        /**
         *
         * @constructor
         */
        var WayBack = function (googleMap) {
            this.googleMap = googleMap;
        };

        WayBack.prototype.go = function () {
            $(".layout-header")
                .append("<div style='height: 3em; background: black; width: 100%; vertical-align: middle'>" +
                    "<div id='way-back-date' style='font-weight: bold; color: white; text-align: center; vertical-align: middle'>" +
                    "</div>" +
                    "</div>"
            );



            var superchargers = new SiteIterator()
                .withSort(SiteSorting.BY_OPENED_DATE)
                .withPredicate(SitePredicates.IS_OPEN_AND_COUNTED)
                .toArray().reverse();

            $.each(superchargers, function (index, site) {
                site.marker.setVisible(false);
            });

            var count = 1;
            var map = this.googleMap;

            var lastInfoWindow = null;

            function nextOne() {
                if (lastInfoWindow != null) {
                    lastInfoWindow.close();
                }

                var supercharger = superchargers.pop();

                $("#way-back-date").html(
                        supercharger.dateOpened.getFullYear() + "&nbsp;" + supercharger.dateOpened.getMonth()
                );

                supercharger.marker.setVisible(true);

                var infoWindow = new google.maps.InfoWindow({
                    content: supercharger.displayName
                });
                infoWindow.open(map, supercharger.marker);

                lastInfoWindow = infoWindow;


                if (superchargers.length > 0) {
                    setTimeout(nextOne, 1000);
                }
                count++;
            }

            nextOne();


        };

        return WayBack;


    });