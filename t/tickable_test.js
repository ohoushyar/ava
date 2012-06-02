/*
 * Tickable Test
 */
tickableTest = function () {
    module('Tickable');

    test( 'Constructor', function() {
                var tickable = Ava.Tickable({
                        keys: ["d/4"],
                        duration: "q",
                    });
                ok( tickable, 'tickable has been initiated successfully');

                tickable = Ava.Tickable({
                        keys: ["d/4"],
                        duration: "q",
                        isRemovable: true,
                    });
                ok( tickable, 'tickable has been initiated successfully');

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

                equal(typeof tickable.note, 'object', 'tickable.note returns object');

                equal(tickable.duration, "q", 'Return expected value of duration');

                equal(tickable.isRemovable, false, 'Return expected value of isRemovable');
            });

};

