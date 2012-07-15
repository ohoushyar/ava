var c ;

/*
 * run
 */
var run = function() {
    var clef = "treble";
    var containerDivId = "music_wysiwyg";
    var measures = 1;
    var numBeat = 3;
    var beatValue = 4;

    var container = Ava.Container({
                clef: clef,
                initNumOfMeasures: measures,
                numBeat: numBeat,
                beatValue: beatValue,
                containerDivId: containerDivId,
                initMeasure: {
                        clef: 'treble',
                        showClef: true,
                        keySignature: 'G',
                        showTimeSignature: true,
                        tickables: [
                            { keys: ["d/4"], duration: "64" },
                            // { keys: ["b/4"], duration: "qr" },
                            // { keys: ["c/4"], duration: "q" },
                            // { keys: ["d/4"], duration: "q" },
                        ],
                    },
            });
    container.draw();
    container.toggleEditable();

    $("#ava-context-currDuration-value").html(Ava.Context.currentDuration());

    return container;
}

$(document).ready(function() {
        c = run();

        // Add some fancy debug info
        $("#ava-context-currDuration").change( function(){
                Ava.Context.currentDuration($(this).val());
                $("#ava-context-currDuration-value").html($(this).val());
            });
    });




//    var notes2 = [
//        new Vex.Flow.StaveNote({ keys: ["a/4"], duration: "q" }),
//        new Vex.Flow.StaveNote({ keys: ["a/4"], duration: "q" }),
//        new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "qr" }),
//        new Vex.Flow.StaveNote({ keys: ["c/4", "e/4", "a/4"], duration: "q" }),
//    ];
//

//    var voice2 = new Vex.Flow.Voice(Vex.Flow.TIME4_4).setStrict(true);
//    voice2.addTickables(notes2);
//
//    var formatter = new Vex.Flow.Formatter().joinVoices([voice, voice2]).
//            formatToStave([voice, voice2], container.stave);
//
//
