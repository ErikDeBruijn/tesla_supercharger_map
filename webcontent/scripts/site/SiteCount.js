define(['site/SiteIterator', 'site/SitePredicates'], function (SiteIterator, SitePredicates) {

    /**
     *
     * @constructor
     */
    var SiteCount = function () {
    };

    SiteCount.sortByKeyStringValue = function (mapOne, mapTwo) {
        return mapOne.key.localeCompare(mapTwo.key);
    };
    SiteCount.sortByOpenCount = function (mapOne, mapTwo) {
        var numberResult = mapTwo.open - mapOne.open;
        return numberResult !== 0 ? numberResult : SiteCount.sortByKeyStringValue(mapOne, mapTwo);
    };
    SiteCount.sortByTotalCount = function (mapOne, mapTwo) {
        var count1 = mapOne.open + mapOne.construction + mapOne.permit;
        var count2 = mapTwo.open + mapTwo.construction + mapTwo.permit;
        var numberResult = count2 - count1;
        return numberResult !== 0 ? numberResult : SiteCount.sortByKeyStringValue(mapOne, mapTwo);
    };
    SiteCount.sortByTotalCountThenOpenCount = function (mapOne, mapTwo) {
        var numberResult = SiteCount.SortByTotalCount(mapOne, mapTwo);
        return numberResult !== 0 ? numberResult : SiteCount.SortByOpenCount(mapOne, mapTwo);
    }

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
