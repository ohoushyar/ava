var c ;

/*
 * run
 */
var run = function() {
    var clef = "treble";
    var containerDivId = "music_wysiwyg";
    var measures = 1;
    var numBeat = 4;
    var beatValue = 4;

    var container = Ava.Container({
                clef: clef,
                initNumOfMeasures: measures,
                numBeat: numBeat,
                beatValue: beatValue,
                containerDivId: containerDivId,
            });
    container.draw();
    container.toggleEditable();

    return container;
}

$(document).ready(function() {
        c = run();
    });




//    // Create the note
//    var notes = [
//        new Vex.Flow.StaveNote({ keys: ["d/5"], duration: "wr" }),
//        new Vex.Flow.BarNote(),
//
////        new Vex.Flow.StaveNote({ keys: ["d/5"], duration: "wr" }),
////        new Vex.Flow.BarNote(),
////
////
////        new Vex.Flow.StaveNote({ keys: ["d/5"], duration: "wr" }),
////        new Vex.Flow.BarNote(),
////
////        new Vex.Flow.StaveNote({ keys: ["d/4"], duration: "q" }),
////        new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "q" }),
////        new Vex.Flow.StaveNote({ keys: ["d/4"], duration: "q" }),
////        new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "qr" }),
////        new Vex.Flow.BarNote(),
////
////        new Vex.Flow.StaveNote({ keys: ["d/5"], duration: "wr" }),
////        new Vex.Flow.BarNote(),
////
////        new Vex.Flow.StaveNote({ keys: ["d/5"], duration: "wr" }),
////        new Vex.Flow.BarNote(),
////
////        new Vex.Flow.StaveNote({ keys: ["d/5"], duration: "wr" }),
////        new Vex.Flow.BarNote(),
////
////        new Vex.Flow.StaveNote({ keys: ["d/5"], duration: "wr" }),
////        new Vex.Flow.BarNote(),
////
////        new Vex.Flow.StaveNote({ keys: ["d/5"], duration: "wr" }),
////        new Vex.Flow.BarNote(),
//        ];
//    var notes2 = [
//        new Vex.Flow.StaveNote({ keys: ["d/5"], duration: "wr" }),
//        new Vex.Flow.BarNote(),
//
////        new Vex.Flow.StaveNote({ keys: ["d/5"], duration: "wr" }),
////        new Vex.Flow.BarNote(),
////
////        new Vex.Flow.BarNote(),
//    ];
//
////    Vex.Flow.Formatter.FormatAndDraw(container.ctx, container.stave, notes);
//    var voice = new Vex.Flow.Voice(time).setStrict(true);
//    voice.addTickables(notes);
//    voice.addTickables(notes2);
//
//    var formatter = new Vex.Flow.Formatter().joinVoices([voice]).formatToStave([voice], container.stave);
//
//    voice.draw(container.ctx, container.stave);
//
//
//
//

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
