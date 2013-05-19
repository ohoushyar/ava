/*
 * Bar View
 */
Ava.BarView = Backbone.View.extend({

    initialize: function() {
        this.stave = new Ava.StaveView({model: this.model.get('stave')});
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

        this.voice = new Vex.Flow.Voice(this.model.get('voice'));
        // Add notes to voice
        this.voice.addTickables(this.notes);

        this.beam_indices = beam;

    },

    render: function() {
        var vex_stave = this.stave.render().vex_stave;

        // Format and justify the tickables
        var formatter = new Vex.Flow.Formatter()
            .joinVoices([this.voice])
            .formatToStave([this.voice], vex_stave);

        var ctx = this.model.get('stave').get('ctx');

        // TODO: make it a function
        // If there is beam get a BeamView instance
        var beam_view = {};
        var beams = _.keys(this.beam_indices);
        for (var beam_index=0; beam_index < beams.length; beam_index+=1) {
            var note_indices = this.beam_indices[ beams[beam_index] ];
            var v_notes = [];
            for (var note_index=0; note_index < note_indices.length; note_index += 1) {
                v_notes.push(this.notes[ note_indices[note_index] ]);
            }

            beam_view[beams[beam_index]] = new Ava.BeamView({
                model: new Backbone.Model({
                    notes: v_notes,
                    ctx: ctx
                })
            });
        }

        // Run voice draw
        this.voice.draw(ctx, vex_stave);

        // Now run BeamView render
        _.each(_.keys(beam_view), function(beam_view_key) {
            beam_view[beam_view_key].render();
        });

        return this;
    },

});
