/**
 * Ava Leftnav View class
 *
 * @class Ava.LeftnavView
 * @constructor
 * @param {Object} spec
 * @extends from Backbone.View
 **/
Ava.LeftnavView = function(spec) {
    var that = {};
    var tmpl = "";

    tmpl    += '    <div class="left-nav pull-left" id="left-nav-container">';
    tmpl    += '        <div class="panel-group" id="accordion">';

    tmpl    += '        <% _.each( left_nav, function(lnav_obj) { %>';
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
    tmpl    += '                        <div class="btn-group" data-toggle="buttons">';
    tmpl    += '                        <% _.each( lnav_obj.btns, function(btn) { %>';
    tmpl    += '                            <label class="btn btn-default btn-sm"><input type="radio" name="<%= this.btn_name %>" id="<%= this.btn_pref_id + btn.id %>"><%= btn.label %></label>';
    tmpl    += '                        <% }, lnav_obj ); %>';
    tmpl    += '                        </div>';
    tmpl    += '                    </div>';
    tmpl    += '                </div>';
    tmpl    += '            </div>';
    tmpl    += '        <% }); %>';

    tmpl    += '        </div>';
    tmpl    += '    </div>';


    var left_nav = [
        {
            title:        'Clefs',
            href:         '#clefs',
            id:           'clefs',
            btn_name:     'left-nav-btn-clefs',
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
            btn_name:     'left-nav-btn-ksign',
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
            btn_name:     'left-nav-btn-tsign',
            btn_pref_id:  'left-nav-btn-tsign-',
            btns: [
                { id: "2-2"  , label: "2/2"  },
                { id: "2-4"  , label: "2/4"  },
                { id: "3-4"  , label: "3/4"  },
                { id: "4-4"  , label: "4/4"  },
                { id: "5-4"  , label: "5/4"  },
                { id: "6-4"  , label: "6/4"  },
                { id: "3-8"  , label: "3/8"  },
                { id: "6-8"  , label: "6/8"  },
                { id: "12-8" , label: "12/8" },
                { id: "C"    , label: "C"    },
                { id: "C|"   , label: "C|"   },
            ],
        },

        {
            title:        'Barlines',
            href:         '#barlines',
            id:           'barlines',
            btn_name:     'left-nav-btn-barline',
            btn_pref_id:  'left-nav-btn-barline-',
            btns: [
                { id: 'test', label: 'Test' },
            ],
        },
    ];

    var toggle_leftnav_currents = function() {
        // set current clef
        var clef = _.findWhere( left_nav, {title: 'Clefs'} );
        Ava.Utils.toggle_button(clef.btn_pref_id + Ava.Context.cc());

        // set current key signature
        var key_sig = _.findWhere( left_nav, {title: 'Key Signatures'} );
        Ava.Utils.toggle_button(key_sig.btn_pref_id + Ava.Context.ck());

        // set current time signature
        var time_sig = _.findWhere( left_nav, {title: 'Time Signatures'} );
        Ava.Utils.toggle_button(time_sig.btn_pref_id + Ava.Context.ct().replace(/\//, '-'));

    };

    ( function(spec) {
        var View = Backbone.View.extend({

            template: _.template( tmpl ),

            /**
             * @method render
             **/
            render: function() {
                this.$el.append( this.template({
                    left_nav: left_nav,
                }) );

                toggle_leftnav_currents();

                return this;
            },
        });

        that = new View(spec);
    })(spec);

    return that;
};
