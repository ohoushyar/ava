/*
 * Measure Test
 */
measureTest = function () {
    var env = avaTestHelper.init_env();

    module('Measure');

    test( 'Constructor', function() {
                var measure;

                measure = Ava.Measure({
                        x: 10,
                        ctx: env.ctx,
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
                        ctx: env.ctx,
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
                        ctx: env.ctx,
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
                        ctx: env.ctx,
                    });
                ok( measure, 'Measure has been initiated successfully and filled with removable rest');

                measure = Ava.Measure({
                        clef: 'treble',
                        showClef: true,
                        keySignature: 'G',
                        numBeat: 3,
                        beatValue: 4,
                        showTimeSignature: true,
                        tickables: [
                            { keys: ["d/4"], duration: "hr" },
                        ],
                        ctx: env.ctx,
                    });
                ok( measure, 'Measure of 3/4 has been initiated successfully and filled with removable rest');

                try {
                    measure = Ava.Measure({
                            x: 10,
                            ctx: env.ctx,
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

    test( 'Methods', function() {
                var measure;

                measure = Ava.Measure({
                        clef: 'treble',
                        showClef: true,
                        keySignature: 'G',
                        numBeat: 3,
                        beatValue: 4,
                        showTimeSignature: true,
                        tickables: [
                            { keys: ["d/4"], duration: "h" },
                        ],
                        ctx: env.ctx,
                    });

                ok( (function() {measure.draw(); return true}()), 'Successfully ran method draw');

                equal(measure.has_empty_spot(), true, 'Return expected value of has_empty_spot');

                ok( (function() { measure.addTickable( Ava.Tickable({ keys: ["d/4"], duration: "q" })); return true; }()), 'Successfully added a tickable to measure');

             });

};

