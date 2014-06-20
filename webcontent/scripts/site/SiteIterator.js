define(['util/Objects', 'site/Sites'], function (Objects, Sites) {

    /**
     *
     * @constructor
     */
    var SiteIterator = function () {
        this.predicates = [];
        this.sortFunction = null;
    };

    SiteIterator.prototype.withPredicate = function (predicateFunction) {
        this.predicates.push(predicateFunction);
        return this;
    };

    SiteIterator.prototype.withSort = function (sortFunction) {
        this.sortFunction = sortFunction;
        return this;
    };


    SiteIterator.prototype.iterate = function (applyFunction) {
        var LENGTH = Sites.LIST.length,
            i = 0;

        if (this.sortFunction !== null) {
            Sites.LIST.sort(this.sortFunction);
        }

        for (; i < LENGTH; i++) {
            var site = Sites.LIST[i];
            if (this.predicates.length === 0 || this.predicatesApply(site)) {
                applyFunction(site);
            }
        }
    };

    SiteIterator.prototype.predicatesApply = function (site) {
        var i = 0;
        for (; i < this.predicates.length; i++) {
            if (!this.predicates[i](site)) {
                return false;
            }
        }
        return true;
    };

    SiteIterator.prototype.toArray = function () {
        var superchargers = [];
        this.iterate(function(supercharger) {
              superchargers.push(supercharger);
        });
        return superchargers;
    };



    return SiteIterator;

});