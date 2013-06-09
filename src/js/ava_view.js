/**
 * Ava View class
 *
 * To run the app:
 *
 *   var app_view = Ava.View({
 *       div_id: "music_wysiwyg", // The id of the div
 *   });
 *   app_view.render();
 *
 * @class Ava.View
 * @extends from Backbone.View
 * @param {Object} spec
 **/
Ava.View = function(spec) {
    var that = {};

    // Set the default value if nothing passed
    /**
     * The id of div the application is going to render in.
     *
     * @attribute div_id
     * @type {String}
     * @default ava_container
     * @required
     **/
    var div_id = spec.div_id || 'ava_container';

    ( function(spec) {

        var $out_div = $("#"+div_id);
        if ( $out_div.length == 0 ) {
            throw {
                name: 'invalidDiv',
                message: "Invalid div object",
            };
        }

        var View = Backbone.View.extend({

            render: function() {
                this.$el.append( $("<div id=ava_toolbar></div>").html(' -- Toolbar -- ') );
                var canvas_id = 'ava_canvas';
                var $ava_canvas = $("<div id=" + canvas_id + "></div>");
                $ava_canvas.addClass( this.model.canvas_class_name );
                this.$el.append( $ava_canvas );
                this.$el.append( $("<div id=ava_error></div>") );

                // Set context div_id
                Ava.Context.current_div_id(canvas_id);

                // Get an instance of MusicView and run render
                var music_view = Ava.MusicView({
                    model: Ava.Music( this.model.music ),
                });
                music_view.render();

                return this;
            },

        });

        that = new View({
            el: $out_div,
            model: spec.model
        });
    } )(spec);

    return that;
};
