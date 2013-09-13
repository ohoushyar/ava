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
    var tmpl = "<div id=ava_toolbar>";

    tmpl    += '    <nav class="navbar navbar-default" role="navigation">';
    tmpl    += '        <div class="btn-group">';

    // primary buttons
    tmpl    += '<% _.each( btns, function(btn_obj) { btn = _.keys(btn_obj); %>              <button type="button" class="btn btn-primary btn-lg" id="toolbar-button-clef"><%= btn[0] %></button> <% }); %>';

    tmpl    += '        </div>';
    tmpl    += '    </nav>';

    tmpl    += '    <nav class="navbar navbar-default" role="navigation">';
    // A div for each primary button
    tmpl    += '<% _.each( btns, function(btn_obj) { %>';
    tmpl    += '<%      var primary_btn = _.first(_.keys(btn_obj)).toLowerCase(); %>';
    tmpl    += '<%      var id = "toolbar-btngrp-" + primary_btn; %>';
    tmpl    += '        <div class="btn-group" id="<%= id %>">';
    tmpl    += '<%      _.each(_.first(_.values( btn_obj )), function(subbtn) { %>';
    tmpl    += '<%          var id = "toolbar-button-" + primary_btn + "-" + subbtn.toLowerCase(); %>';
    tmpl    += '            <button type="button" class="btn btn-default btn-sm" id="<%= id %>"><%= subbtn %></button>';
    tmpl    += '<%          }); %>';
    tmpl    += '        </div>';
    tmpl    += '<%      }); %>';
    tmpl    += '    </nav>';

    tmpl    += "</div>";
    tmpl    += "<div id=<%= canvas_id %> class=<%= canvas_class_name %> ></div>";
    tmpl    += "<div id=ava_error></div>";

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

        var btns = [
            {'Clefs':  ['Treble', 'Bass', 'Soprano', 'Alto', 'Tenor', 'Percussion']},
            {'Times':  ['2/2', '2/4', '3/4', '4/4', '5/4', '6/4', '3/8', '6/8', '9/8', '12/8', 'C', 'C|']},
            {'Keys':   ['GM/Em', 'DM/Bm', 'AM/F#m', 'EM/C#m', 'BM/G#m', 'F#M/D#m', 'C#M/A#m', 'CbM/Abm', 'GbM/Ebm', 'DbM/Bbm', 'AbM/Fm', 'EbM/Cm', 'BbM/Gm', 'FM/Dm', 'CM/Am']},
            {'Note':   ['W', 'H', 'Q', 'B']}
            ];

        var View = Backbone.View.extend({

            template: _.template( tmpl ),

            render: function() {
                var canvas_id = 'ava_canvas';
                this.$el.html( this.template({
                    btns: btns,
                    canvas_id: canvas_id,
                    canvas_class_name: this.model.canvas_class_name
                }) );

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
