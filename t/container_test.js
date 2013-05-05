/*
 * Container Test
 */
containerTest = function () {

    module('Container');


    test( 'Constructor', function() {
        var env = ava_test_helper.init_env();
        env.hide();
        ok( Ava.Container({
                    clef: "treble",
                    initMeasure: {
                            clef: 'treble',
                            showClef: true,
                            keySignature: 'G',
                            showTimeSignature: true,
                            tickables: [
                                { keys: ["d/4"], duration: "64" },
                            ],
                        },
                    numBeat: 4,
                    beatValue: 4,
                    containerDivId: env.canvas_id,
                }), 'Container has been initiated successfully');
    });

    test( 'Methods', function() {
        var container = Ava.Container({
                    clef: "treble",
                    initMeasure: {
                            clef: 'treble',
                            showClef: true,
                            keySignature: 'G',
                            showTimeSignature: true,
                            tickables: [
                                { keys: ["d/4"], duration: "64" },
                            ],
                        },
                    numBeat: 4,
                    beatValue: 4,
                    containerDivId: ava_test_helper.init_env().div_id,
                });
        ok( (function(){container.draw(); return true;}()), 'Called draw method successfully' );

        // get a new canvas
        ok( (function(){
                Ava.Container({
                    clef: "treble",
                    initMeasure: {
                            clef: 'treble',
                            showClef: true,
                            keySignature: 'G',
                            showTimeSignature: true,
                            tickables: [
                                { keys: ["d/4"], duration: "64" },
                            ],
                        },
                    numBeat: 3,
                    beatValue: 4,
                    containerDivId: ava_test_helper.init_env().div_id,
                }).draw();
                return true;
            }()), 'Called draw method successfully for a container of 3/4' );
    });

};

