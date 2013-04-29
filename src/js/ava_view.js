/*
 * AvaView View class
 * Extend from Backbone.View
 */
var AvaView = Backbone.View.extend({

    render: function() {
        var canvas = this.$el.get();
        var renderer_backend;
        if (this.model.renderer_backend == 'canvas')
            renderer_backend = Vex.Flow.Renderer.Backends.RAPHAEL;
        var renderer = new Vex.Flow.Renderer(canvas, renderer_backend);

        var ctx = renderer.getContext();
        var stave = new Vex.Flow.Stave(this.model.stave.x, this.model.stave.y, 500);
        stave.addClef(this.model.clef).setContext(ctx).draw();

        // Create the notes
        var notes = [
        // A quarter-note C.
        new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "q" }),

        // A quarter-note D.
        new Vex.Flow.StaveNote({ keys: ["d/4"], duration: "q" }),

        // A quarter-note rest. Note that the key (b/4) specifies the vertical
        // position of the rest.
        new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "qr" }),

        // A C-Major chord.
        new Vex.Flow.StaveNote({ keys: ["c/4", "e/4", "g/4"], duration: "q" })
            ];

        // Create a voice in 4/4
        var voice = new Vex.Flow.Voice({
            num_beats: 4,
            beat_value: 4,
            resolution: Vex.Flow.RESOLUTION
        });

        // Add notes to voice
        voice.addTickables(notes);

        // Format and justify the notes to 500 pixels
        var formatter = new Vex.Flow.Formatter().
        joinVoices([voice]).format([voice], 500);

        // Render voice
        voice.draw(ctx, stave);
    },
});
