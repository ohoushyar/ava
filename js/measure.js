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
    // that.x;
    // that.width;
    // Public Methods
    // that.addTickable;
    // that.draw;

    // Private attribute
    var y,
        ctx,
        first,
        current,
        last,
        clef,
        showClef,
        keySignature,
        numBeat,
        beatValue,
        showTimeSignature,
        timeSignature,
        nextMeasure,
        prevMeasure,
        time,
        voice,
        stave,
        formatter,
        errorContainer,
        formatter;

    /*
     * push_to_link
     *
     * private
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
     *
     * private
     *
     */
    var setWidth = function (newWidth) {
        that.width = newWidth;
        stave.setWidth(that.width);
    };

    /*
     * fill_with_removable_rest
     *
     * private
     *
     */
    var fill_with_removable_rest = function() {
        // Fill up the rest of measure with rest and flag it as removable
        if (!voice.isComplete()) {
            // Get the number of ticks to fill with removable rest
            var rest_ticks = voice.getTotalTicks() - voice.getTicksUsed();

            for (i=0; i<Ava.valid_duration.length; i+=1) {
                var ticks = Vex.Flow.durationToTicks(Ava.valid_duration[i]);

                // More than enough, try the next one
                if (rest_ticks < ticks)
                    continue;

                for (var j=1; j<=Math.floor(rest_ticks/ticks); j+=1) {
                    var rest_note = Ava.Tickable({
                        note: new Vex.Flow.StaveNote({ keys: [Vex.Flow.durationToGlyph(Ava.valid_duration[i], 'r').position], duration: Ava.valid_duration[i] + 'r' }),
                        isRemovable: true,
                    });

                    // Now add it to voice and linked list
                    try {
                        voice.addTickable(rest_note.note)
                        push_to_link(rest_note);
                    }
                    catch (e) {
                        $(errorContainer).html('[Measure] ' + e.code + ': ' + e.message);
                        throw e;
                    }
                }

                if (rest_ticks % ticks)
                    rest_ticks %= ticks;
                else
                    break;
            }
        }
    };


    /*
     * Constructor
     */
    (function(spec) {
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

            voice = new Vex.Flow.Voice(time).setStrict(true);
            while (current) {
                voice.addTickable(current.note);
                current = current.next;
            }
        }
        catch (e) {
            $(errorContainer).html('[Measure] ' + e.code + ': ' + e.message);
            throw e;
        }



        fill_with_removable_rest();


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

    }(spec));


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

        // Reset the voice
        voice = new Vex.Flow.Voice(time).setStrict(true);

        current = first;
        while (current) {
            if (current.isRemovable){
                // It's the first one
                if (typeof current.prev === 'object') {
                    current = current.prev;
                    last = current;
                }
                else
                    first = undefined;

                break;
            }

            voice.addTickable(current.note);
            current = current.next;
        }

        if (!voice.isComplete()) {
            push_to_link(tickable);
            voice.addTickable(tickable.note);
            fill_with_removable_rest();
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

    /*
     * has_empty_spot
     *
     * public
     *
     */
    that.has_empty_spot = function() {
            current = first;

            while (current) {
                if (current.isRemovable)
                    return true;

                current = current.next;
            }

            return false;
    };

    // Tmp Public
    that._formatter = formatter;
    that._stave = stave;

    return that;
};

