/*
 * Measure
 */
Ava.Measure = function (spec) {
    var that = {};

    // Private attribute
    var x = spec.x || 10;
    var y = spec.y || 0;

    var width     = spec.width || 250;
    var clef      = spec.clef;
    var numBeat   = spec.numBeat || 4;
    var beatValue = spec.beatValue || 4;
    var tickables = spec.tickables;
    var ctx       = spec.ctx;

    var nextMeasure,
        prevMeasure,
        time,
        stave;

    var errorContainer = "#error-msg";

    time = {
        num_beats: numBeat,
        beat_value: beatValue,
        resolution: Vex.Flow.RESOLUTION,
    };

    stave = new Vex.Flow.Stave(x, y, width);
    stave.setContext(ctx);
    if (spec.clef !== undefined)
        stave.addClef(clef);

    /*
     * addTickable
     */
    var addTickable = function(tickable) {
        tickables.push(tickable);
    };

    /*
     * draw
     */
    var draw = function () {
        try {
            stave.draw();

            var voice = new Vex.Flow.Voice(time).setStrict(true);
            voice.addTickables(tickables);

            var formatter = new Vex.Flow.Formatter().joinVoices([voice]).formatToStave([voice], stave);

            voice.draw(ctx, stave);
        }
        catch (e) {
            $(errorContainer).html(e.code + ': ' + e.message);
        }
    };

    // Public
    that.x     = x;
    that.width = width;
    that.tickables = tickables;
    that.draw = draw;
    that.addTickable = addTickable;

    return that;
};
