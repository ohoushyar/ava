/*
 * AvaView View class
 * Extend from Backbone.View
 *
 * To run the app:
 *
 *   var app_view = new Ava.View({
 *       el: $("#music_wysiwyg"), // The id of the div
 *   });
 *   app_view.render();
 *
 */
Ava.View = Backbone.View.extend({

    render: function() {
        this.$el.append( $("<div id=ava_toolbar></div>").html(' -- Toolbar -- ') );
        var $ava_canvas = $("<div id=ava_canvas></div>");
        $ava_canvas.addClass( this.model.canvas_class_name );
        this.$el.append( $ava_canvas );

        // Set context div_id
        Ava.Context.vexflow_ctx_div_id($ava_canvas[0]);

        // Get an instance of MusicView and run render
        var music_view = new Ava.MusicView({
            model: Ava.Music( this.model.music ),
        });
        music_view.render();

        return this;
    },

});
