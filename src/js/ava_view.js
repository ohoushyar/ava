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

        // Create a vexflow context and make it available from everywhere
        // in application
        Ava.set_vexflow_context( Vex.Flow.Renderer.buildContext($ava_canvas[0], Vex.Flow.Renderer.Backends.RAPHAEL, Ava.Constant.DEFAULT_WIDTH, Ava.Constant.DEFAULT_HEIGHT) );

        return this;
    },

});
