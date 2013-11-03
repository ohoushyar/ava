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

    var add_click_event = function (div_id, context) {
        var $div = $('#' + div_id + ' svg');
        // Set to global context if not valid
        if ( ! $div.length ) {
            $div = $('#' + Ava.Context.current_div_id() + ' svg');
            if (! $div.length ) {
                throw {
                    name: 'initError',
                    message: "Unable to select element",
                };
            }
        }

        var cursor = Ava.CursorView({
                model: Ava.Cursor({})
            }).render();

        var containerOffset = {top: 0, left: 0};
        containerOffset.left = Math.floor($div.offset().left);
        containerOffset.top = Math.floor($div.offset().top);

        var prev_mouse_x, prev_mouse_y;
        $div.mouseover( function (e) {
        //$div.click( function (e) {
            var bar_view, c_width, c_height;
            var mouse_x = e.pageX - containerOffset.left;
            var mouse_y = e.pageY - containerOffset.top;

            try {
                // get bar over which the mouse move and pass it to get_hot_spot
                bar_view = context.music_view.get_bar_view_of(mouse_x);
            } catch (e) {
                // do nothing
            }

            // move the cursor to hot spot over the stave
            if (typeof bar_view === 'object') {
                c_width = c_height = 10;
                mouse_y = bar_view.stave.get_y_hot_spot(mouse_y) - (c_height/2);
            }
            // calculate the hot spot and return the postion
            var move = _.bind( cursor.resize_and_move, cursor );
            // Call move in defer as it's pretty expensive to run and render
            _.defer( move, c_width, c_height, mouse_x, mouse_y);
            //alert( mouse_x +', '+ (mouse_y) + ', left offset: ' + containerOffset.left + ', right top: '+ containerOffset.top );
        } );
    };

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
                    model: Ava.Music( this.model.music ),
                });
                this.music_view.render();

                // Add event
                add_click_event( Ava.Context.current_div_id(), this );

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
