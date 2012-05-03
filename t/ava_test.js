/*
 * Ava Test
 */
avaTest = function () {
    module('Ava');

    test( 'Constructor', function() {
            equal( Ava.Context.currentDuration(), 'w', 'Ava constructed successfully');
            });

    test( 'Context', function() {
            equal( Ava.Context.currentDuration('q'), 'q', 'currentDuration returns the value has been passed');
            equal( Ava.Context.currentDuration(), 'q', 'currentDuration returns the value has been set');

            // Sanity check
            raises( function() {
                    Ava.Context.currentDuration(2);
                }, "Throw exception on invalid duration");
        });
};
