/*
 * run
 */
function run() {
    var clef = "treble";
    var containerDiv = $("#music_wysiwyg")[0];
    var measures = 2;

    var tickables = [
            { type: 'note', value: { keys: ["d/5"], duration: "wr" } },
            { type: 'bar-note' },

            { type: 'note', value: { keys: ["d/4"], duration: "q" } },
            { type: 'note', value: { keys: ["b/4"], duration: "qr" } },
            { type: 'note', value: { keys: ["c/4"], duration: "q" } },
            { type: 'note', value: { keys: ["d/4"], duration: "q" } },
            { type: 'bar-note' },

        ];

    var container = new Ava.WysiwygContainer(clef, measures, containerDiv);
    container.setTickables(tickables);
    container.draw();
}

$(document).ready(function() {
        run();
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
