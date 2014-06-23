define(
    [
        'lib/bootstrap',
        'page/map/SuperchargerCarousel', 'page/map/StatusControlView', 'page/map/RangeControlView',
        'page/map/action/WayBackAction', 'page/map/action/ToggleRangeCirclesAction', 'page/map/action/ControlToggleAction',
        'page/map/action/StatusSelectionAction', 'page/map/action/ZoomToLocationAction',
        'nav/NavBarDropdown', 'page/map/action/RoutingAction',
        'page/map/MapView', 'page/map/RenderView','page/map/ZoomView', 'page/map/RoutingPanel', 'lib/jquery.doTimeout'
    ],
    function (bootstrap, SuperchargerCarousel, StatusControlView, RangeControlView,
              WayBackAction, ToggleRangeCirclesAction, ControlToggleAction, StatusSelectionAction, ZoomToLocationAction,
              NavBarDropDown, RoutingAction, MapView, RenderView, ZoomView, RoutingPanel) {

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
            new NavBarDropDown();

            new SuperchargerCarousel();
            this.mapView = new MapView();
            new RenderView();

            new StatusControlView();
            new RangeControlView();
            new ZoomView();
            new RoutingPanel();

            new RoutingAction(this.mapView.googleMap);
            new WayBackAction(this.mapView.googleMap);
            new ToggleRangeCirclesAction(this.mapView);
            new ControlToggleAction();
            new StatusSelectionAction();
            new ZoomToLocationAction(this.mapView.googleMap);
        };

        return MapPage;
    });