/*
 * Context test
 */
Ava.Test.Context = function () {
    module("Ava.Context");

    var context;

    test("Construction test", function() {
            context = Ava.Context( {currentDuration: 'q'} );

            ok(context, "Valid context");
            equal(context.currentDuration, 'q', "Context constructed successfully");

            // Sanity check
            raises( function() {
                Ava.Context({currentDuration: 12});
                }, "Throw exception on invalid duration");
            });

    test("Method test", function() {
            context.setCurrentDuration('w');

            equal(context.currentDuration, 'w', "Context currentDuration set successfully");

            // Sanity check
            raises( function() {
                context.setCurrentDuration(12);
                }, "Throw exception on invalid duration");

            });

};


