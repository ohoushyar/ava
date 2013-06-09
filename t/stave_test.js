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
                    equal(e.message, 'Invalid clef', 'Successfully throw exception on invalid clef');
                }

                try {
                    stave = Ava.Stave({
                            key_signature: 'terrible',
                        });
                }
                catch (e) {
                    equal(e.message, 'Invalid key_signature', 'Successfully throw exception on invalid key_signature');
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
                    time_signature: '6/8',
                    key_signature: 'F',
                });
                equal( stave.get('clef'), 'bass', 'Clef init successfully');
                equal( stave.get('time_signature'), '6/8', 'Time signature init successfully');
                equal( stave.get('key_signature'), 'F', 'Key signature init successfully');

                ok( stave.move_to(10,100), 'Successfully ran move_to method');
                equal( stave.get('x'), 10, 'The value of x updated successfully');
                equal( stave.get('y'), 100, 'The value of y updated successfully');

            });

};

