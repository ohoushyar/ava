/*
 * Bar
 *
 * Bar (or measure) is a segment of time defined by a given number of
 * beats, each of which are assigned a particular note value
 * (https://en.wikipedia.org/wiki/Bar_%28music%29)
 *
 * Public Attributes:
 *
 * Public Methods:
 * that.add_tickable
 *
 */

Ava.BarModel = Backbone.Model.extend({
    defaults: function() {
        return {
            stave: {
                x: 0,
                y: 0,
                width: 300,
            },
            show_clef: false,
            num_beat: 4,
            beat_value: 4,
            show_time_signature: false,
        };
    },

    initialize: function() {
        if (typeof this.get('stave') !== 'object') {
            throw {
                name: 'invalidParam',
                message: 'Passed invalid parameter. Stave have to be an object',
            };
        }
        this.set( 'stave', new Ava.StaveModel(this.get('stave')) );

        if (typeof this.get('tickables') !== 'object') {
            throw {
                name: 'invalidParam',
                message: 'Passed invalid parameter. tickables have to be an array',
            };
        }
        // Init list of tickables
        this.set( 'tickables', new Ava.TickableList(this.get('tickables')) );

        this.set( 'time_signature', this.get('num_beat') + "/" + this.get('beat_value') );
    },

    // validate: function(attrs, options) {
    // },
});

Ava.BarList = Backbone.Collection.extend({
    model: Ava.BarModel,
});

Ava.Bar = function (spec) {

    var that = new Ava.BarModel(spec);

    // Private attribute
    var first,
        current,
        last,
        clef,
        show_clef,
        key_signature,
        num_beat,
        beat_value,
        show_time_signature,
        time_signature,
        next_bar,
        prev_bar,
        time,
        voice,
        stave;
        // default_width = 250,
        // pixel_per_note = 50;

    /*
     * add_tickable
     *
     * public
     *
     */
    that.add_tickable = function(tickable) {
        if ( typeof tickable !== 'object' ) {
            throw {
                name: 'invalidParam',
                message: 'Passed invalid parameter',
            };
        }

        that.get('tickables').add(tickable);
    };

    return that;
};

    /*
     * fill_with_removable_rest
     *
     * private
     *
     */
    // var fill_with_removable_rest = function() {

    //     var rests = [];

    //     // Fill up the rest of Bar with rest and flag it as removable
    //     if (!voice.isComplete()) {
    //         // Get the number of ticks to fill with removable rest
    //         var rest_ticks = voice.getTotalTicks() - voice.getTicksUsed();

    //         for (i=0; i<Ava.valid_duration.length; i+=1) {
    //             var ticks = Vex.Flow.durationToTicks(Ava.valid_duration[i]);

    //             // More than enough, try the next one
    //             if (rest_ticks < ticks)
    //                 continue;

    //             for (var j=1; j<=Math.floor(rest_ticks/ticks); j+=1) {
    //                 var rest_note = Ava.Tickable({
    //                     keys: [Vex.Flow.durationToGlyph(Ava.valid_duration[i], 'r').position],
    //                     duration: Ava.valid_duration[i] + 'r',
    //                     isRemovable: true,
    //                 });

    //                 // Sort by size start with small
    //                 rests.unshift(rest_note);
    //             }

    //             if (rest_ticks % ticks)
    //                 rest_ticks %= ticks;
    //             else
    //                 break;
    //         }


    //         // Now add them to voice and push to the linked list
    //         for (i=0; i<rests.length; i++) {
    //             try {
    //                 voice.addTickable(rests[i].note)
    //                 push_to_link(rests[i]);
    //             }
    //             catch (e) {
    //                 $(errorContainer).html('[Bar] ' + e.code + ': ' + e.message);
    //                 throw e;
    //             }
    //         }

    //     }
    // };

    // /*
    //  * draw
    //  *
    //  * public
    //  *
    //  */
    // that.draw = function () {
    //     // Do some hack to get the right justification width to pass to stave before
    //     // running formatToStave
    //     adjust_width();

    //     try {
    //         stave.draw();
    //         formatter.joinVoices([voice]).formatToStave([voice], stave);
    //         voice.draw(ctx, stave);
    //     }
    //     catch (e) {
    //         $(errorContainer).html('[Measure::draw] ' + e.code + ': ' + e.message);
    //     }
    // };

    // var adjust_width = function() {
    //     var current_width = get_current_width();

    //     if (current_width >= that.width - stave.getNoteStartX())
    //         setWidth(current_width + stave.getNoteStartX() + 200);

    // };

    // // Well so far couldn't found a proper way of getting this value, so here is
    // // a work around, pretty messy to get it.
    // var get_current_width = function() {
    //     // A magic to enable ticks to give their width ...
    //     formatter.createTickContexts([voice]);

    //     var contexts = formatter.tContexts;
    //     var contextList = contexts.list;
    //     var contextMap = contexts.map;

    //     var minTotalWidth = 0;

    //     // Go through each tick context and calculate total width and smallest
    //     // ticks.
    //     for (var i = 0; i < contextList.length; ++i) {
    //         var context = contextMap[contextList[i]];

    //         // preFormat() gets them to descend down to their tickables and modifier
    //         // contexts, and calculate their widths.
    //         context.preFormat();
    //         minTotalWidth += context.getWidth();

    //         var minTicks = context.getMinTicks();
    //         if (i == 0) this.minTicks = minTicks;
    //         if (minTicks < this.minTicks) this.minTicks = minTicks;
    //     }

    //     return minTotalWidth;
    // };

    /*
     * has_empty_spot
     *
     * public
     *
     */
    // that.has_empty_spot = function() {
    //         current = first;

    //         while (current) {
    //             if (current.isRemovable)
    //                 return true;

    //             current = current.next;
    //         }

    //         return false;
    // };


