/*
 * Bar View
 */
Ava.BarView = Backbone.View.extend({

    initialize: function() {
        this.stave = new Ava.StaveView({model: this.model.stave});
        this.notes = _.map(this.model.notes, function(spec) {
                return new Vex.Flow.StaveNote(spec);
            });

        this.voice = new Vex.Flow.Voice(this.model.voice);
        // Add notes to voice
        this.voice.addTickables(this.notes);

    },

    render: function() {
        var vex_stave = this.stave.render().vex_stave;

        // Format and justify the notes to 500 pixels
        var formatter = new Vex.Flow.Formatter().
        joinVoices([this.voice]).formatToStave([this.voice], vex_stave);
        this.voice.draw(this.model.stave.ctx, vex_stave);

        return this;
    },

});
