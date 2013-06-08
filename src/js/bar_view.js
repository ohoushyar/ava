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

            /**
             * @method _fill_with_removable_rest
             * @private
             **/
            _fill_with_removable_rest: function() {
                var that = this;
                var rests = [];

                // Fill up the rest of Bar with rest and flag it as removable
                if (!that.voice.isComplete()) {
                    // Get the number of ticks to fill with removable rest
                    var rest_ticks = that.voice.getTotalTicks().value() - that.voice.getTicksUsed().value();

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
                        that.voice.addTickable(rest)
                    });
                }

            },

            initialize: function() {

                this.model.get('notes').on('add', this.render, this);

                var stave_model = Ava.Stave({
                    x: this.model.get('x'),
                    y: this.model.get('y'),
                    width: this.model.get('width'),
                });

                // Show clef
                if (this.model.get('show_clef') && typeof this.model.get('clef') === 'string') {
                    stave_model.set('clef', this.model.get('clef'));
                }
                // Show time signature
                if (this.model.get('show_time_signature')) {
                    var time_signature = this.model.get('num_beats') + '/' + this.model.get('beat_value');
                    stave_model.set('time_signature', time_signature);
                }
                // Show key signature
                if (this.model.get('show_key_signature')) {
                    stave_model.set('key_signature', this.model.get('key_signature'));
                }

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
                var that = this;

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
                    });

                this.beam_indices = beam;
                this.voice = new Vex.Flow.Voice({
                    num_beats: this.model.get('num_beats'),
                    beat_value: this.model.get('beat_value'),
                    resolution: Vex.Flow.RESOLUTION,
                });

                // Add notes to voice
                this.voice.addTickables(this.notes);
                this._fill_with_removable_rest();

                // TODO: Need to find out a proper way to clear the context
                var ctx = Ava.Context.vexflow_ctx();
                ctx.clear();
                //ctx.clearRect(that.model.get('x'), that.model.get('y'), that.model.get('width'), that.model.get('height'));
                var vex_stave = that.stave.render().vex_stave;

                // Format and justify the tickables
                var formatter = new Vex.Flow.Formatter()
                    .joinVoices([that.voice])
                    .formatToStave([that.voice], vex_stave);

                // If there is beam get a BeamView instance
                var beam_view = {};
                _.each( _.keys(that.beam_indices), function(beam_key) {
                    // Get the note indices of notes which they have the same beam
                    var note_indices = that.beam_indices[beam_key];
                    var v_notes = [];
                    _.each( note_indices, function(note_index) {
                        v_notes.push(that.notes[note_index]);
                    });

                    // Get the instance
                    beam_view[beam_key] = new Ava.BeamView({
                        model: new Backbone.Model({
                            notes: v_notes,
                            ctx: ctx,
                        })
                    });
                });

                // Run voice draw
                that.voice.draw(ctx, vex_stave);

                // Now run BeamView render
                _.each(_.keys(beam_view), function(beam_view_key) {
                    beam_view[beam_view_key].render();
                });

                return that;
            },

        });

        that = new View(spec);

    })(spec)

    return that;
};
