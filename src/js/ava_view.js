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

    tmpl    += '    <nav class="navbar navbar-default" role="navigation">';
    tmpl    += '        <a class="navbar-brand" href="#">AVA</a>';
    tmpl    += '        <div class="btn-group">';
    tmpl    += '            <button type="button" class="btn btn-default navbar-btn">';
    tmpl    += '                <span class="glyphicon glyphicon-edit"></span>';
    tmpl    += '            </button>';
    tmpl    += '        </div>';
    tmpl    += '        <div class="btn-group">';
    tmpl    += '            <button type="button" class="btn btn-default navbar-btn">';
    tmpl    += '                undo';
    tmpl    += '            </button>';
    tmpl    += '            <button type="button" class="btn btn-default navbar-btn">';
    tmpl    += '                redo';
    tmpl    += '            </button>';
    tmpl    += '        </div>';

    // times buttons
    tmpl    += '        <div class="btn-group">';
    tmpl    += '<% _.each( time_btns, function(btn) { %>              <button type="button" class="btn btn-default navbar-btn" id="nav-btn-acd-<%= btn.id %>"><%= btn.label %></button> <% }); %>';
    tmpl    += '        </div>';

    tmpl    += '        <div class="btn-group">';
    tmpl    += '            <button type="button" class="btn btn-default navbar-btn" id="nav-btn-rest-toggle">';
    tmpl    += '                <span id="nav-btn-rest-toggle-img">R</span>';
    tmpl    += '            </button>';
    tmpl    += '        </div>';

    // Accidentals
    tmpl    += '        <div class="btn-group">';
    tmpl    += '<% _.each( accidental_btns, function(btn) { %>              <button type="button" class="btn btn-default navbar-btn" id="nav-btn-acd-<%= btn.id %>"><%= btn.label %></button> <% }); %>';
    tmpl    += '        </div>';

    tmpl    += '    </nav>';

    tmpl    += '    <div class="left-nav pull-left" id="left-nav-container">';
    tmpl    += '        <div class="panel-group" id="accordion">';

    tmpl    += '<% _.each( left_nav, function(lnav_obj) { %>';
    tmpl    += '            <div class="panel panel-default">';
    tmpl    += '                <div class="panel-heading">';
    tmpl    += '                    <h4 class="panel-title">';
    tmpl    += '                        <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="<%= lnav_obj.href %>">';
    tmpl    += '                            <%= lnav_obj.title %>';
    tmpl    += '                        </a>';
    tmpl    += '                    </h4>';
    tmpl    += '                </div>';
    tmpl    += '                <div id="<%= lnav_obj.id %>" class="panel-collapse collapse">';
    tmpl    += '                    <div class="panel-body">';
    tmpl    += '                        <div class="btn-group">';
    tmpl    += '<%      _.each( lnav_obj.btns, function(btn) { %>';
    tmpl    += '                            <button type="button" class="btn btn-default btn-sm" id="<%= this.btn_pref_id + btn.id %>"><%= btn.label %></button>';
    tmpl    += '<%      }, lnav_obj ); %>';
    tmpl    += '                        </div>';
    tmpl    += '                    </div>';
    tmpl    += '                </div>';
    tmpl    += '            </div>';
    tmpl    += '<% }); %>';


    tmpl    += '       </div>';
    tmpl    += '   </div>';
    tmpl    += '   <div class="pull-left ava-main-container">';
    tmpl    += '       <div id="<%= canvas_id %>" class="<%= canvas_class_name %>" ></div>';
    tmpl    += '       <div id="ava_error"></div>';
    tmpl    += '       <div id="ava_verbose"></div>';
    tmpl    += '   </div>';

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

        var time_btns = [
            {
                id:     '64',
                label:  '64th',
            },
            {
                id:     '32',
                label:  '32th',
            },
            {
                id:     '16',
                label:  '16th',
            },
            {
                id:     '8',
                label:  '8th',
            },
            {
                id:     '4',
                label:  'q',
            },
            {
                id:     '2',
                label:  'h',
            },
            {
                id:     '1',
                label:  'w',
            },
            {
                id:     'dot',
                label:  '.',
            },
            {
                id:     'ddot',
                label:  '..',
            },
            {
                id:     'tie',
                label:  'Tie(+)',
            },
        ];

        var accidental_btns = [
            {
                id:     'dsharp',
                label:  'X',
            },
            {
                id:     'sharp',
                label:  '#',
            },
            {
                id:     'natural',
                label:  'natural',
            },
            {
                id:     'flat',
                label:  'b',
            },
            {
                id:     'dflat',
                label:  'bb',
            },
        ];

        var left_nav = [
            {
                title:        'Clefs',
                href:         '#clefs',
                id:           'clefs',
                btn_pref_id:  'left-nav-btn-clefs-',
                body:         'Different clefs will show off here.',
                btns: [
                    {
                        id:     'treble',
                        label:  'Treble',
                    },
                    {
                        id:     'bass',
                        label:   'Bass',
                    },
                    {
                        id:     'tenor',
                        label:   'Tenor',
                    },
                    {
                        id:     'alto',
                        label:   'Alto',
                    },
                    {
                        id:     'percussion',
                        label:   'Percussion',
                    },
                ],
            },

            {
                title:        'Key Signatures',
                href:         '#key-signatures',
                id:           'key-signatures',
                btn_pref_id:  'left-nav-btn-ksign-',
                body:         'Key signatures will show off here.',
                btns: [
                    { id: "C"   , label: "C"   },
                    { id: "Am"  , label: "Am"  },
                    { id: "F"   , label: "F"   },
                    { id: "Dm"  , label: "Dm"  },
                    { id: "Bb"  , label: "Bb"  },
                    { id: "Gm"  , label: "Gm"  },
                    { id: "Eb"  , label: "Eb"  },
                    { id: "Cm"  , label: "Cm"  },
                    { id: "Ab"  , label: "Ab"  },
                    { id: "Fm"  , label: "Fm"  },
                    { id: "Db"  , label: "Db"  },
                    { id: "Bbm" , label: "Bbm" },
                    { id: "Gb"  , label: "Gb"  },
                    { id: "Ebm" , label: "Ebm" },
                    { id: "Cb"  , label: "Cb"  },
                    { id: "Abm" , label: "Abm" },
                    { id: "G"   , label: "G"   },
                    { id: "Em"  , label: "Em"  },
                    { id: "D"   , label: "D"   },
                    { id: "Bm"  , label: "Bm"  },
                    { id: "A"   , label: "A"   },
                    { id: "F#m" , label: "F#m" },
                    { id: "E"   , label: "E"   },
                    { id: "C#m" , label: "C#m" },
                    { id: "B"   , label: "B"   },
                    { id: "G#m" , label: "G#m" },
                    { id: "F#"  , label: "F#"  },
                    { id: "D#m" , label: "D#m" },
                    { id: "C#"  , label: "C#"  },
                    { id: 'A#m' , label: "A#m" },
                ],
            },

            {
                title:        'Time Signatures',
                href:         '#time-signatures',
                id:           'time-signatures',
                btn_pref_id:  'left-nav-btn-tsign-',
                btns: [
                    { id: "2/2"  , label: "2/2"  },
                    { id: "2/4"  , label: "2/4"  },
                    { id: "3/4"  , label: "3/4"  },
                    { id: "4/4"  , label: "4/4"  },
                    { id: "5/4"  , label: "5/4"  },
                    { id: "6/4"  , label: "6/4"  },
                    { id: "3/8"  , label: "3/8"  },
                    { id: "6/8"  , label: "6/8"  },
                    { id: "12/8" , label: "12/8" },
                    { id: "C"    , label: "C"    },
                    { id: "C|"   , label: "C|"   },
                ],
            },

            {
                title:        'Barlines',
                href:         '#barlines',
                id:           'barlines',
                btn_pref_id:  'left-nav-btn-barline-',
                btns: [
                    { id: 'test', label: 'Test' },
                ],
            },
        ];

        var View = Backbone.View.extend({

            template: _.template( tmpl ),

            render: function() {
                var canvas_id = Ava.Constant.DEFAULT_CANVAS_ID;

                // Set the correct offset as SVG is not before draw
                this.$el.html( this.template({
                    time_btns:          time_btns,
                    accidental_btns:    accidental_btns,
                    left_nav:           left_nav,
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
