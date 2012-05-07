/*
 * Measure Test
 */
measureTest = function () {
    module('Measure');

    var measure;

    test( 'Constructor', function() {
                measure = Ava.Measure({
                        x: 10,
                        ctx: ctx,
                        tickables: [ new Vex.Flow.StaveNote({ keys: ["d/5"], duration: "wr" }), ],
                    });
                ok( measure, 'Measure has been initiated successfully');

                try {
                    measure = Ava.Measure({
                            x: 10,
                            ctx: ctx,
                            tickables: [
                                new Vex.Flow.StaveNote({ keys: ["d/5"], duration: "wr" }),
                                new Vex.Flow.StaveNote({ keys: ["d/5"], duration: "wr" }),
                            ],
                        });
                }
                catch (e) {
                    equal(e.message, 'Too many ticks.', 'Successfully throw exception');
                }



            });

    // test( 'Methods', function() {
    //             measure = Ava.Measure()
    //          });

};

