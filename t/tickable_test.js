/*
 * Tickable Test
 */
tickable_test = function () {
    module('Tickable Model');

    test( 'Constructor', function() {
                var tickable = Ava.Tickable({
                        keys: ["d/4"],
                        duration: "q",
                    });
                ok( tickable, 'tickable initialized successfully with minimum requirements');

                tickable = Ava.Tickable({
                        keys: ["d/4"],
                        duration: "q",
                        is_removable: true,
                    });
                ok( tickable, 'tickable initialized successfully with is_removable');

                tickable = Ava.Tickable({
                        keys: ["d/4"],
                        duration: "q",
                        beam: "beam1",
                    });
                ok( tickable, 'tickable initialized successfully with beam');

                try {
                    tickable = Ava.Tickable({
                            keys: "d/4",
                            duration: "q",
                        });
                }
                catch (e) {
                    equal(e.message, 'Invalid params', 'Successfully throw exception');
                }

                try {
                    tickable = Ava.Tickable({
                            keys: ["d/4"],
                            duration: 4,
                        });
                    }
                catch (e) {
                    equal(e.message, 'Invalid params', 'Successfully throw exception');
                }

                try {
                    tickable = Ava.Tickable({
                            duration: "q",
                        });
                    }
                catch (e) {
                    equal(e.message, 'Invalid params', 'Successfully throw exception');
                }

                try {
                    tickable = Ava.Tickable({
                            keys: ["d/4"],
                        });
                    }
                catch (e) {
                    equal(e.message, 'Invalid params', 'Successfully throw exception');
                }
            });

    test( 'Methods', function() {
                var tickable = Ava.Tickable({
                        keys: ["d/4"],
                        duration: "q",
                    });

                equal(tickable.get('duration'), "q", 'Return expected value of duration');
                equal(tickable.get('beam'), undefined, 'Return expected value of beam');
                equal(tickable.get('is_removable'), false, 'Return expected value of is_removable');


                tickable = Ava.Tickable({
                        keys: ["d/4"],
                        duration: "q",
                        beam: 'beam1',
                    });

                equal(tickable.get('beam'), 'beam1', 'Return expected value of beam');
            });

};

