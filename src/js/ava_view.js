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

    // TODO: Load from a file
    var tmpl = "";

    tmpl    += '    <div class="pull-left ava-main-container">';
    tmpl    += '        <div id="<%= canvas_id %>" class="<%= canvas_class_name %>" ></div>';
    tmpl    += '        <div id="ava_error"></div>';
    tmpl    += '        <div id="ava_verbose"></div>';
    tmpl    += '    </div>';

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

            template: _.template( tmpl ),

            render: function() {
                var canvas_id = Ava.Constant.DEFAULT_CANVAS_ID;

                // render toolbar
                Ava.ToolbarView({el: this.$el})
                    .render();

                // render left-nav
                Ava.LeftnavView({el: this.$el})
                    .render();

                // Set the correct offset as SVG is not before draw
                this.$el.append( this.template({
                    canvas_id:          canvas_id,
                    canvas_class_name:  Ava.Constant.DEFAULT_CANVAS_CLASS
                }) );

                // Set context div_id
                Ava.Context.current_div_id(canvas_id);

                // Get an instance of MusicView and run render
                this.music_view = Ava.MusicView({
                    model:  Ava.Music( this.model.music ),
                    el:     this.$el,
                });
                this.music_view.render();

                $('#' + div_id + ' > div > #ava-canvas').width(Ava.Constant.DEFAULT_WIDTH);

                return this;
            },

        });

        that = new View({
            el: $out_div,
            model: spec.model
        });

        // // Read from template file
        // $.get( '../src/template/ava.tmpl', function(result) {
        //         alert(result);
        //         that.tmpl = result;
        //     });

    } )(spec);

    return that;
};
