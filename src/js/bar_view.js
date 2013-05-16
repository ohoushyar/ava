/*
 * Bar View
 */
Ava.BarView = Backbone.View.extend({

    initialize: function() {
        this.stave = new Ava.StaveView({model: this.model.get('stave')});
        this.notes = this.model.get('notes').map( function(spec) {
                return new Vex.Flow.StaveNote({
                    keys: spec.get('keys'),
                    duration: spec.get('duration'),
                });
            });

        this.voice = new Vex.Flow.Voice(this.model.get('voice'));
        // Add notes to voice
        this.voice.addTickables(this.notes);

    },

    render: function() {
        var vex_stave = this.stave.render().vex_stave;

        // Format and justify the tickables
        var formatter = new Vex.Flow.Formatter().
        joinVoices([this.voice]).formatToStave([this.voice], vex_stave);
        this.voice.draw(this.model.get('stave').get('ctx'), vex_stave);

        return this;
    },

});
