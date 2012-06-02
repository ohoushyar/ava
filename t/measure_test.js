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
                        tickables: [
                            { keys: ["d/5"], duration: "wr" },
                        ],
                    });
                ok( measure, 'Measure has been initiated successfully');

                measure = Ava.Measure({
                        clef: 'treble',
                        showClef: true,
                        keySignature: 'G',
                        showTimeSignature: true,
                        tickables: [
                            { keys: ["d/4"], duration: "q" },
                            { keys: ["b/4"], duration: "qr" },
                            { keys: ["c/4"], duration: "q" },
                            { keys: ["d/4"], duration: "q" },
                        ],
                        ctx: ctx,
                    });
                ok( measure, 'Measure has been initiated successfully');

                measure = Ava.Measure({
                        clef: 'treble',
                        showClef: true,
                        keySignature: 'G',
                        showTimeSignature: true,
                        tickables: [
                            { keys: ["d/4"], duration: "q" },
                        ],
                        ctx: ctx,
                    });
                ok( measure, 'Measure has been initiated successfully and filled with removable rest');

                measure = Ava.Measure({
                        clef: 'treble',
                        showClef: true,
                        keySignature: 'G',
                        showTimeSignature: true,
                        tickables: [
                            { keys: ["d/4"], duration: "hr" },
                        ],
                        ctx: ctx,
                    });
                ok( measure, 'Measure has been initiated successfully and filled with removable rest');

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

