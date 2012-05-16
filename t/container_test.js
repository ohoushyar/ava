/*
 * Container Test
 */
containerTest = function () {
    module('Container');

    var container;

    test( 'Constructor', function() {
                container = Ava.Container({
                            clef: "treble",
                            initNumOfMeasures: 1,
                            numBeat: 4,
                            beatValue: 4,
                            containerDivId: "vex-canvas-container-test",
                        });
                ok( container, 'Container has been initiated successfully');



            });

};

