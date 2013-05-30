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

    var app_view = new Ava.View({
        el: $("#music_wysiwyg"),
    });
    app_view.render();
}

$(document).ready(function() {
        c = run();

        // Add some fancy debug info
        $("#ava-context-currDuration").change( function(){
                Ava.Context.currentDuration($(this).val());
                $("#ava-context-currDuration-value").html($(this).val());
            });
    });

