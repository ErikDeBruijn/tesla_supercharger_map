define(
    [
        'lib/bootstrap',
        'page/map/SuperchargerCarousel', 'page/map/StatusControlView', 'page/map/RangeControlView',
        'page/map/action/WayBackAction', 'page/map/action/ToggleRangeCirclesAction', 'page/map/action/ControlToggleAction',
        'page/map/action/StatusSelectionAction', 'page/map/action/ZoomToLocationAction',
        'nav/NavBarDropdown', 'page/map/Routing',
        'page/map/MapView', 'page/map/ControlView','page/map/ZoomView', 'lib/jquery.doTimeout'
    ],
    function (bootstrap, SuperchargerCarousel, StatusControlView, RangeControlView,
              WayBackAction, ToggleRangeCirclesAction, ControlToggleAction, StatusSelectionAction, ZoomToLocationAction,
              NavBarDropDown, Routing, MapView, ControlView, ZoomView) {

        /**
         *
         * @constructor
         */
        var MapPage = function () {
            this.page = $("#page-map");
        };

        MapPage.INIT_PROP = "page-initialized";

        MapPage.prototype.onPageShow = function () {
            if (!this.page.data(MapPage.INIT_PROP)) {
                this.initialize();
                this.page.data(MapPage.INIT_PROP, true);
            }
            $("#navbar-map-dropdown").show();
            $("#navbar-map-search").show();
            $("#carousel-container").show();
        };

        MapPage.prototype.onPageHide = function () {
            $("#navbar-map-dropdown").hide();
            $("#navbar-map-search").hide();
            $("#carousel-container").hide();
        };

        MapPage.prototype.initialize = function () {
            this.navBarDropDown = new NavBarDropDown();

            this.superChargerCarousel = new SuperchargerCarousel();
            this.mapView = new MapView();
            this.controlView = new ControlView();

            new StatusControlView();
            new RangeControlView();
            new ZoomView();

            this.routing = new Routing(this.mapView.googleMap);

            this.action1 = new WayBackAction(this.mapView.googleMap);
            this.action2 = new ToggleRangeCirclesAction(this.mapView);
            this.action3 = new ControlToggleAction();
            this.action4 = new StatusSelectionAction();
            this.action5 = new ZoomToLocationAction(this.mapView.googleMap);

            this.initMapViewListeners();
        };

        /**
         * INIT: MapView
         */
        MapPage.prototype.initMapViewListeners = function () {
            this.mapView.on("map-event-route-added", jQuery.proxy(this.routing.handleAddRouteEvent, this.routing));
        };

        return MapPage;

    });