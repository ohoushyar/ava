/*
 * Stave Test
 */
stave_test = function () {
    module('Stave Model');

    test( 'Constructor', function() {
                var stave = Ava.Stave({});
                ok( stave, 'stave has been initiated successfully');

                stave = Ava.Stave({
                    clef: 'treble',
                });
                ok( stave, 'stave has been initiated successfully');

                try {
                    stave = Ava.Stave({
                            clef: 'terrible',
                        });
                }
                catch (e) {
                    equal(e.message, 'Invalid clef', 'Successfully throw exception');
                }

            });

    test( 'Methods', function() {

                // Init with default values
                var stave = Ava.Stave({});
                equal(stave.get('x'), 0, 'Return expected default value of x');
                equal(stave.get('y'), 0, 'Return expected default value of y');
                equal(stave.get('width'), 250, 'Return expected default value of width');

                // Init stave with clef
                stave = Ava.Stave({
                    clef: 'bass',
                });
                equal( stave.get('clef'), 'bass', 'Clef set init successfully');

            });

};

