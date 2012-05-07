/*
 * Measure
 *
 * Bar (or measure) is a segment of time defined by a given number of
 * beats, each of which are assigned a particular note value
 * (https://en.wikipedia.org/wiki/Bar_%28music%29)
 *
 */
Ava.Measure = function (spec) {
    var that = {};

    // Private attribute
    var x = spec.x || 10;
    var y = spec.y || 0;

    var ctx       = spec.ctx;
    var width     = spec.width || 250;
    var tickables = spec.tickables;

    var clef = spec.clef;
    var showClef = spec.showClef || false;

    var keySignature = spec.keySignature;

    var numBeat = spec.numBeat || 4;
    var beatValue = spec.beatValue || 4;
    var showTimeSignature = spec.showTimeSignature || false;

    var timeSignature = numBeat + "/" + beatValue;

    var nextMeasure,
        prevMeasure,
        time,
        voice,
        stave,
        formatter;

    stave = new Vex.Flow.Stave(x, y, width);
    stave.setContext(ctx);

    var setWidth = function (newWidth) {
        width = newWidth;
        stave.setWidth(width);
    };


    var errorContainer = "#error-msg";

    time = {
        num_beats: numBeat,
        beat_value: beatValue,
        resolution: Vex.Flow.RESOLUTION,
    };

    try {
        voice = new Vex.Flow.Voice(time).setStrict(true);
        voice.addTickables(tickables);
    }
    catch (e) {
        $(errorContainer).html('[Measure] ' + e.code + ': ' + e.message);
        throw e;
    }


    // Fill up the rest of measure with rest and flag it as removable
    //
    //
    //
    //
    //

    if (clef !== undefined && showClef) {
        stave.addClef(clef);
        setWidth(width+15);
    }

    if (keySignature !== undefined) {
        stave.addKeySignature(keySignature);
        if (keySignature != "C")
            setWidth(width+15);
    }

    if (showTimeSignature) {
        stave.addTimeSignature(timeSignature);
        setWidth(width+15);
    }

    var formatter = new Vex.Flow.Formatter();

    /*
     * addTickable
     */
    var addTickable = function(tickable) {
        if (!voice.isComplete()) {
            // Push it to tickables if successfully added to voice
            tickables.push(tickable);
            voice.addTickables(tickable);
        } else {
            console.warn('Too many ticks');
        }
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
