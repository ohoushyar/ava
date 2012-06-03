/*
 * Container Test
 */
containerTest = function () {
    var env = avaTestHelper.init_env();

    module('Container');

    var container;

    test( 'Constructor', function() {
                container = Ava.Container({
                            clef: "treble",
                            initNumOfMeasures: 1,
                            numBeat: 4,
                            beatValue: 4,
                            containerDivId: env.canvas_id,
                        });
                ok( container, 'Container has been initiated successfully');



            });

};

