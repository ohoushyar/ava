/**
 * Bar View
 * @example
 *      view = Ava.BarView({
 *          // mod is required attribute to init a Bar model
 *          model: Ava.Bar(mod),
 *      });
 *
 * @class Ava.BarView
 * @constructor
 * @param {Object} spec
 * @uses Ava.StaveView
 * @extends Backbone.View
 **/
Ava.BarView = function(spec) {

    var that = {};

    ( function(spec) {

        var View = Backbone.View.extend({

            initialize: function() {
                this.model.get('notes').on('add', this.render, this);
                var stave_model = this.model.get_stave();
                stave_model.move_to_current_pos();
                this.stave = Ava.StaveView({model: stave_model});
            },

            /**
             * @method add_note
             * @param {Object} spec Ava.Tickable
             **/
            add_note: function(spec) {
                this.model.add_note( Ava.Tickable(spec) );
            },

            /**
             * @method render
             **/
            render: function() {
                var beam = {};
                var index = 0;
                this.notes = this.model.get('notes').map( function(spec) {
                        if (spec.get('beam')) {
                            if ( _.isArray(beam[spec.get('beam')]) ) {
                                beam[spec.get('beam')].push(index);
                            } else {
                                beam[spec.get('beam')] = [index];
                            }
                        }
                        index += 1;

                        return new Vex.Flow.StaveNote({
                            keys: spec.get('keys'),
                            duration: spec.get('duration'),
                        });
                    }, this);

                this.beam_indices = beam;
                this.voice = new Vex.Flow.Voice({
                    num_beats: this.model.get('num_beats'),
                    beat_value: this.model.get('beat_value'),
                    resolution: Vex.Flow.RESOLUTION,
                });

                // Add notes to voice
                this.voice.addTickables(this.notes);
                _fill_with_removable_rest();

                // TODO: Need to find out a proper way to clear the context
                var ctx = Ava.Context.vexflow_ctx();
                //ctx.clear();
                //ctx.clearRect(this.model.get('x'), this.model.get('y'), this.model.get('width'), this.model.get('height'));
                var vex_stave = this.stave.render().vex_stave;
                Ava.Context.current_x(vex_stave.x + vex_stave.width);

                // Format and justify the tickables
                var formatter = new Vex.Flow.Formatter()
                    .joinVoices([this.voice])
                    .formatToStave([this.voice], vex_stave);

                // If there is beam get a BeamView instance
                var beam_view = {};
                _.each( _.keys(this.beam_indices), function(beam_key) {
                    // Get the note indices of notes which they have the same beam
                    var note_indices = this.beam_indices[beam_key];
                    var v_notes = [];
                    _.each( note_indices, function(note_index) {
                        v_notes.push(this.notes[note_index]);
                    }, this);

                    // Get the instance
                    beam_view[beam_key] = new Ava.BeamView({
                        model: new Backbone.Model({
                            notes: v_notes,
                            ctx: ctx,
                        })
                    });
                }, this);

                // Run voice draw
                this.voice.draw(ctx, vex_stave);

                // Now run BeamView render
                _.each(_.keys(beam_view), function(beam_view_key) {
                    beam_view[beam_view_key].render();
                });

                return this;
            },

        });

        that = new View(spec);

    })(spec);

    /**
    * @method _fill_with_removable_rest
    * @private
    **/
    var _fill_with_removable_rest = function() {

        var rests = [];
        var voice = that.voice;

        // Fill up the rest of Bar with rest and flag it as removable
        if (!voice.isComplete()) {
            // Get the number of ticks to fill with removable rest
            var rest_ticks = voice.getTotalTicks().value() - voice.getTicksUsed().value();

            for (i=0; i<Ava.valid_duration.length; i+=1) {

                var ticks = Vex.Flow.durationToTicks(Ava.valid_duration[i]);

                // More than enough, try the next one
                if (rest_ticks < ticks)
                    continue;

                var j=1;
                while (j <= Math.floor(rest_ticks/ticks)) {
                    var rest_note = new Vex.Flow.StaveNote({
                        keys: [Vex.Flow.durationToGlyph(Ava.valid_duration[i], 'r').position],
                        duration: Ava.valid_duration[i] + 'r',
                    });

                    // Sort by size start with small
                    rests.unshift(rest_note);
                    j += 1;
                }

                if (rest_ticks % ticks)
                    rest_ticks %= ticks;
                else
                    break;
            }

            // Now add them to voice and push to the linked list
            _.each(rests, function(rest) {
                voice.addTickable(rest)
            });
        }

    };


    return that;
};
