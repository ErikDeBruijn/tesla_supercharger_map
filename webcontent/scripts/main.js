requirejs.config(
    {
        inlineJSON: false,
        paths: {
            text: 'lib/text',
            json: 'lib/json'
        }
    }
);


// Start the main app logic.
requirejs([ 'nav/NavBar', 'lib/bootstrap', 'lib/jquery.doTimeout' ], function (NavBar) {

    /**
     * ON DOCUMENT READY
     */
    $(document).ready(function () {
        var navBar = new NavBar();
        navBar.setInitialPage();
    });

});