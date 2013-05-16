
/*
 * Beam Test
 */
beam_test = function () {
    module('Beam Model');

    test( 'Constructor', function() {
                var beam = Ava.Beam({
                    notes: [
                        { keys: ["d/4"], duration: "8" },
                        { keys: ["f/4"], duration: "8" },
                        { keys: ["c/4"], duration: "8" },
                        { keys: ["c/4"], duration: "8" },
                    ],
                });

                ok( beam, 'beam has been initialiazed successfully');

                try {
                    beam = Ava.Beam({});
                }
                catch (e) {
                    equal(e.message, 'Passed invalid parameter. notes have to be an array', 'Successfully throw exception on invalid notes');
                }

                try {
                    beam = Ava.Beam({
                        notes: [
                            { keys: ["d/4"], duration: "8" },
                        ],
                    });

                }
                catch (e) {
                    equal(e.message, 'The length of notes array has to be more than 1', 'Successfully throw exception on number of notes not more than 1');
                }

            });

};

