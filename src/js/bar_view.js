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
        var that = this;

        var vex_stave = that.stave.render().vex_stave;

        // Format and justify the tickables
        var formatter = new Vex.Flow.Formatter()
            .joinVoices([that.voice])
            .formatToStave([that.voice], vex_stave);

        var ctx = that.model.get('stave').get('ctx');

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
