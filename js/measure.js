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

    // Public
    that.x;
    that.width;

    that.addTickable;
    that.draw;

    // Private attribute
    var y,
        ctx,
        first,
        current,
        last;

    var clef,
        showClef,
        keySignature,
        numBeat,
        beatValue,
        showTimeSignature,
        timeSignature;

    var nextMeasure,
        prevMeasure,
        time,
        voice,
        stave,
        formatter;

    var errorContainer,
        formatter;

    /*
     * push_to_link
     *
     * A function to simplify pushing the new note to the list.
     *
     * param: Ava.Tickable
     * return: undef
     *
     */
    var push_to_link = function(tickable) {
        if (typeof tickable !== 'object') {
            throw {
                name: 'invalidParam',
                message: 'Passed invalid parameter',
            };
        }

        // Set first to the new note if it's the first one in measure
        if (typeof first !== 'object') {
            first = tickable;
            current = first;
        } else {
            // Otherwise
            current = last;

            current.next = tickable;
            current.next.prev = current;

            current = current.next;
        }

        last = current;
    };

    /*
     * setWidth
     */
    var setWidth = function (newWidth) {
        that.width = newWidth;
        stave.setWidth(that.width);
    };


    /*
     * Constructor
     */
    ( function(spec) {
        var new_note;

        that.x = spec.x || 10;
        y = spec.y || 0;

        ctx        = spec.ctx;
        that.width = spec.width || 250;

        // Init list of notes
        for (var i=0; i < spec.tickables.length; i+=1) {
            if (typeof spec.tickables[i] !== 'object') {
                throw {
                    name: 'invalidParam',
                    message: 'Passed invalid parameter',
                };
            }

            new_note = Ava.Tickable({
                        note: new Vex.Flow.StaveNote({ keys: spec.tickables[i].keys, duration: spec.tickables[i].duration }),
                    });

            push_to_link(new_note);
        }

        clef = spec.clef;
        showClef = spec.showClef || false;

        keySignature = spec.keySignature;

        numBeat = spec.numBeat || 4;
        beatValue = spec.beatValue || 4;
        showTimeSignature = spec.showTimeSignature || false;

        timeSignature = numBeat + "/" + beatValue;

        stave = new Vex.Flow.Stave(that.x, y, that.width);
        stave.setContext(ctx);


        errorContainer = "#error-msg";

        time = {
            num_beats: numBeat,
            beat_value: beatValue,
            resolution: Vex.Flow.RESOLUTION,
        };

        try {
            current = first;

            //voice = new Vex.Flow.Voice(time).setStrict(true);
            voice = new Vex.Flow.Voice(time).setStrict(false);
            while (current) {
                voice.addTickable(current.note);
                current = current.next;
            }
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
            setWidth(that.width+15);
        }

        if (keySignature !== undefined) {
            stave.addKeySignature(keySignature);
            if (keySignature != "C")
                setWidth(that.width+15);
        }

        if (showTimeSignature) {
            stave.addTimeSignature(timeSignature);
            setWidth(that.width+15);
        }

        formatter = new Vex.Flow.Formatter();

    } (spec) );


    /*
     * addTickable
     *
     * public
     *
     */
    that.addTickable = function(tickable, cursorPosition) {
        if (! (typeof tickable !== 'object' || typeof cursorPosition !== 'object')) {
            throw {
                name: 'invalidParam',
                message: 'Passed invalid parameter',
            };
        }

        if (! !voice.isComplete()) {

            // Push it to tickables if successfully added to voice
            push_to_link(tickable);
            voice.addTickable(tickable.note);
        } else {
            console.warn('Too many ticks');
        }
    };

    /*
     * draw
     *
     * public
     *
     */
    that.draw = function () {
        try {
            stave.draw();
            formatter.joinVoices([voice]).formatToStave([voice], stave);
            voice.draw(ctx, stave);
        }
        catch (e) {
            $(errorContainer).html('[Measure::draw] ' + e.code + ': ' + e.message);
        }
    };

    // Tmp Public
    that._formatter = formatter;
    that._stave = stave;

    return that;
};

