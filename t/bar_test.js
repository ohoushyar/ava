/*
 * Measure Test
 */
measureTest = function () {

    module('Measure');

    test( 'Constructor', function() {
                var measure;
                var env = avaTestHelper.init_env();
                env.hide();

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

                measure = Ava.Measure({
                        clef: 'treble',
                        showClef: true,
                        keySignature: 'G',
                        showTimeSignature: true,
                        tickables: [
                            { keys: ["d/4"], duration: "64" },
                            { keys: ["b/4"], duration: "64r" },
                            { keys: ["c/4"], duration: "64" },
                            { keys: ["d/4"], duration: "64" },

                            { keys: ["d/4"], duration: "64" },
                            { keys: ["b/4"], duration: "64r" },
                            { keys: ["c/4"], duration: "64" },
                            { keys: ["d/4"], duration: "64" },

                            { keys: ["d/4"], duration: "64" },
                            { keys: ["b/4"], duration: "64r" },
                            { keys: ["c/4"], duration: "64" },
                            { keys: ["d/4"], duration: "64" },

                            { keys: ["d/4"], duration: "64" },
                            { keys: ["b/4"], duration: "64r" },
                            { keys: ["c/4"], duration: "64" },
                            { keys: ["d/4"], duration: "64" },
                        ],
                        ctx: env.ctx,
                    });
                ok( measure, 'Measure has been initiated successfully with 16 64th note');

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
                var env = avaTestHelper.init_env();

                var test_title = 'Successfully ran method draw';
                env.title.html('Methods - ' + test_title);
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

                ok( (function() {measure.draw(); return true}()), test_title);

                equal(measure.has_empty_spot(), true, 'Return expected value of has_empty_spot');

                ok( (function() { measure.addTickable( Ava.Tickable({ keys: ["d/4"], duration: "q" })); return true; }()), 'Successfully added a tickable to measure');


                env = avaTestHelper.init_env();
                test_title = 'Successfully ran method draw on measure contains 16 64th note';
                env.title.html('Methods - ' + test_title);
                measure = Ava.Measure({
                        clef: 'treble',
                        showClef: true,
                        keySignature: 'G',
                        showTimeSignature: true,
                        tickables: [
                            { keys: ["d/4"], duration: "64" },
                            { keys: ["b/4"], duration: "64r" },
                            { keys: ["c/4"], duration: "64" },
                            { keys: ["d/4"], duration: "64" },

                            { keys: ["d/4"], duration: "64" },
                            { keys: ["b/4"], duration: "64r" },
                            { keys: ["c/4"], duration: "64" },
                            { keys: ["d/4"], duration: "64" },

                            { keys: ["d/4"], duration: "64" },
                            { keys: ["b/4"], duration: "64r" },
                            { keys: ["c/4"], duration: "64" },
                            { keys: ["d/4"], duration: "64" },

                            { keys: ["d/4"], duration: "64" },
                            { keys: ["b/4"], duration: "64r" },
                            { keys: ["c/4"], duration: "64" },
                            { keys: ["d/4"], duration: "64" },
                        ],
                        ctx: env.ctx,
                    });

                ok( (function() {measure.draw(); return true}()), test_title);


                env = avaTestHelper.init_env();
                test_title = 'Successfully ran method draw on measure contains 8 16th note';
                env.title.html('Methods - ' + test_title);
                measure = Ava.Measure({
                        clef: 'treble',
                        showClef: true,
                        numBeat: 2,
                        keySignature: 'G',
                        showTimeSignature: true,
                        tickables: [
                            { keys: ["d/4"], duration: "16" },
                            { keys: ["b/4"], duration: "16r" },
                            { keys: ["c/4"], duration: "16" },
                            { keys: ["d/4"], duration: "16" },

                            { keys: ["d/4"], duration: "16" },
                            { keys: ["b/4"], duration: "16r" },
                            { keys: ["c/4"], duration: "16" },
                            { keys: ["d/4"], duration: "16" },
                        ],
                        ctx: env.ctx,
                    });

                ok( (function() {measure.draw(); return true}()), test_title);


                env = avaTestHelper.init_env();
                test_title = 'Successfully ran method draw on measure contains 32 64th note';
                env.title.html('Methods - ' + test_title);
                measure = Ava.Measure({
                        clef: 'treble',
                        showClef: true,
                        keySignature: 'G',
                        showTimeSignature: true,
                        tickables: [
                            { keys: ["d/4"], duration: "64" },
                            { keys: ["b/4"], duration: "64r" },
                            { keys: ["c/4"], duration: "64" },
                            { keys: ["d/4"], duration: "64" },

                            { keys: ["d/4"], duration: "64" },
                            { keys: ["b/4"], duration: "64r" },
                            { keys: ["c/4"], duration: "64" },
                            { keys: ["d/4"], duration: "64" },

                            { keys: ["d/4"], duration: "64" },
                            { keys: ["b/4"], duration: "64r" },
                            { keys: ["c/4"], duration: "64" },
                            { keys: ["d/4"], duration: "64" },

                            { keys: ["d/4"], duration: "64" },
                            { keys: ["b/4"], duration: "64r" },
                            { keys: ["c/4"], duration: "64" },
                            { keys: ["d/4"], duration: "64" },

                            { keys: ["d/4"], duration: "64" },
                            { keys: ["b/4"], duration: "64r" },
                            { keys: ["c/4"], duration: "64" },
                            { keys: ["d/4"], duration: "64" },

                            { keys: ["d/4"], duration: "64" },
                            { keys: ["b/4"], duration: "64r" },
                            { keys: ["c/4"], duration: "64" },
                            { keys: ["d/4"], duration: "64" },

                            { keys: ["d/4"], duration: "64" },
                            { keys: ["b/4"], duration: "64r" },
                            { keys: ["c/4"], duration: "64" },
                            { keys: ["d/4"], duration: "64" },

                            { keys: ["d/4"], duration: "64" },
                            { keys: ["b/4"], duration: "64r" },
                            { keys: ["c/4"], duration: "64" },
                            { keys: ["d/4"], duration: "64" },
                        ],
                        ctx: env.ctx,
                    });

                ok( (function() {measure.draw(); return true}()), test_title);
             });

};

