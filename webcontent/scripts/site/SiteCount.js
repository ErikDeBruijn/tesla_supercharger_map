define(['site/SiteIterator', 'site/SitePredicates'], function (SiteIterator, SitePredicates) {

    /**
     *
     * @constructor
     */
    var SiteCount = function () {
    };

    SiteCount.sortByOpenCount = function (one, two) {
        return two.open - one.open;
    };
    SiteCount.sortByTotalCount = function (one, two) {
        var count1 = one.open + one.construction + one.permit;
        var count2 = two.open + two.construction + two.permit;
        return count2 - count1;
    };

    /**
     * Site count.
     *
     * RETURNED ARRAY:
     *
     *  [
     *   { key: 'USA',    open: 3, construction: 7, permit: 2  },
     *   { key: 'Germany',open: 3, construction: 4, permit: 1   }
     *  ]
     *
     * REFERENCE MAP:
     *
     * { us : arrayRef,
     *   de: arrayRef
     * }
     */
    SiteCount.getCountListImpl = function (siteIterator, aggregateKey, sortFunction) {
        var referenceMap = {},
            returnedArray = [],
            totalOpen = 0,
            totalConstruction = 0,
            totalPermit = 0;

        siteIterator.iterate(function (supercharger) {
                var aggregateKeyValue = supercharger.address[aggregateKey];
                if (!referenceMap[aggregateKeyValue]) {
                    var newEntry = { key: aggregateKeyValue, open: 0, construction: 0, permit: 0 };
                    referenceMap[aggregateKeyValue] = newEntry;
                    returnedArray.push(newEntry);
                }
                if (supercharger.isConstruction()) {
                    referenceMap[aggregateKeyValue].construction++;
                    totalConstruction++;
                }
                else if (supercharger.isPermit()) {
                    referenceMap[aggregateKeyValue].permit++;
                    totalPermit++;
                }
                else if (supercharger.isOpen()) {
                    referenceMap[aggregateKeyValue].open++;
                    totalOpen++;
                } else {
                    throw new Error("unexpected supercharger status" + supercharger);
                }
            }
        );

        returnedArray.push({ key: 'Total', open: totalOpen, construction: totalConstruction, permit: totalPermit });
        returnedArray.sort(sortFunction);
        return returnedArray;
    };

    SiteCount.getCountListByCountry = function () {

        var siteIterator = new SiteIterator()
            .withPredicate(SitePredicates.NOT_USER_ADDED)
            .withPredicate(SitePredicates.IS_COUNTED);

        return SiteCount.getCountListImpl(siteIterator, 'country', SiteCount.sortByOpenCount);

    };

    SiteCount.getCountListByState = function () {

        var siteIterator = new SiteIterator()
            .withPredicate(SitePredicates.NOT_USER_ADDED)
            .withPredicate(SitePredicates.IS_COUNTED)
            .withPredicate(SitePredicates.IS_USA);

        return SiteCount.getCountListImpl(siteIterator, 'state', SiteCount.sortByTotalCount);

    };


    return SiteCount;

});