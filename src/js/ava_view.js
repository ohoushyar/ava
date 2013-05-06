/*
 * AvaView View class
 * Extend from Backbone.View
 */
Ava.View = Backbone.View.extend({

    render: function() {
        var renderer_backend;
        if (this.model.renderer_backend == Ava.Constant.CANVAS)
            renderer_backend = Vex.Flow.Renderer.Backends.CANVAS;
        else
            renderer_backend = Vex.Flow.Renderer.Backends.RAPHAEL;

        var ctx = Vex.Flow.Renderer.buildContext(this.options.canvas_id, renderer_backend, 500, 120);
        var stave = new Vex.Flow.Stave(this.model.stave.x, this.model.stave.y, 250);
        stave.addClef(this.model.clef).setContext(ctx).draw();

        // Create notes
        var notes = [];
        for (var i=0; i<this.model.notes.length; i+=1) {
            notes[i] = new Vex.Flow.StaveNote(this.model.notes[i]);
        }

        // var r = Vex.Flow.Formatter.FormatAndDraw(ctx, stave, notes);

        // Create a voice in 4/4
        var voice = new Vex.Flow.Voice(this.model.voice);

        // Add notes to voice
        voice.addTickables(notes);

        // Format and justify the notes to 500 pixels
        var formatter = new Vex.Flow.Formatter().
        joinVoices([voice]).formatToStave([voice], stave);

        // Render voice
        voice.draw(ctx, stave);
    },

});
