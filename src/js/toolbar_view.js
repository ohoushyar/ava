/**
 * Bar View
 * @example
 *      view = Ava.ToolbarView({});
 *
 * @class Ava.ToolbarView
 * @constructor
 * @param {Object} spec
 * @extends Backbone.View
 **/
Ava.ToolbarView = function(spec) {

    var that = {};
    var tmpl = "";

    tmpl    += '    <nav class="navbar navbar-default" role="navigation">';
    tmpl    += '        <a class="navbar-brand" href="#">AVA</a>';
    tmpl    += '        <div class="btn-group">';
    tmpl    += '            <button type="button" class="btn btn-default navbar-btn" data-toggle="button" disabled="disabled">';
    tmpl    += '                <span class="glyphicon glyphicon-edit"></span>';
    tmpl    += '            </button>';
    tmpl    += '        </div>';
    tmpl    += '        <div class="btn-group">';
    tmpl    += '            <button type="button" class="btn btn-default navbar-btn" disabled="disabled">';
    tmpl    += '                undo';
    tmpl    += '            </button>';
    tmpl    += '            <button type="button" class="btn btn-default navbar-btn" disabled="disabled">';
    tmpl    += '                redo';
    tmpl    += '            </button>';
    tmpl    += '        </div>';

    // durations buttons
    tmpl    += '    <% _.each(["durs", "dots"], function(grp) { %>';
    tmpl    += '        <div class="btn-group" data-toggle="buttons">';
    tmpl    += '        <% _.each( dur_btns[grp], function(btn) { %>';
    tmpl    += '            <label class="btn btn-default navbar-btn"><input type="radio" name="<%= btn.name %>" id="<%= btn.name %>-<%= btn.id %>"><%= btn.label %></label>';
    tmpl    += '        <% }); %>';
    tmpl    += '        </div>';
    tmpl    += '    <% }); %>';

    // Rest
    tmpl    += '        <div class="btn-group">';
    tmpl    += '            <button type="button" class="btn btn-default navbar-btn" id="nav-btn-rest-toggle" data-toggle="button">';
    tmpl    += '                <span id="nav-btn-rest-toggle-img">R</span>';
    tmpl    += '            </button>';
    tmpl    += '        </div>';

    // Accidentals
    tmpl    += '        <div class="btn-group" data-toggle="buttons">';
    tmpl    += '        <% _.each( accidental_btns, function(btn) { %>';
    tmpl    += '            <label class="btn btn-default navbar-btn"><input type="radio" name="<%= btn.name %>" id="nav-btn-acd-<%= btn.id %>"><%= btn.label %></label>';
    tmpl    += '        <% }); %>';
    tmpl    += '        </div>';

    tmpl    += '    </nav>';

    var dur_btns = {
        // duration
        durs: [
            {
                name:   'toolbar-btn-dur',
                id:     '64',
                label:  '64th',
            },
            {
                name:   'toolbar-btn-dur',
                id:     '32',
                label:  '32th',
            },
            {
                name:   'toolbar-btn-dur',
                id:     '16',
                label:  '16th',
            },
            {
                name:   'toolbar-btn-dur',
                id:     '8',
                label:  '8th',
            },
            {
                name:   'toolbar-btn-dur',
                id:     '4',
                label:  '4th/q',
            },
            {
                name:   'toolbar-btn-dur',
                id:     '2',
                label:  '2nd/h',
            },
            {
                name:   'toolbar-btn-dur',
                id:     '1',
                label:  '1/w',
            },
        ],

        dots: [
            {
                name:   'toolbar-btn-dots',
                id:     'dot',
                label:  '.',
            },
            {
                name:   'toolbar-btn-dots',
                id:     'ddot',
                label:  '..',
            },
        ],

        // TODO: Need to figure out what is this about
        // ties: [
        //     {
        //         name:   'toolbar-btn-tie',
        //         id:     'tie',
        //         label:  'Tie(+)',
        //     },
        // ],
    };

    var accidental_btns = [
        {
            name:   'toolbar-btn-acd',
            id:     'dsharp',
            label:  'X',
        },
        {
            name:   'toolbar-btn-acd',
            id:     'sharp',
            label:  '#',
        },
        {
            name:   'toolbar-btn-acd',
            id:     'natural',
            label:  'natural',
        },
        {
            name:   'toolbar-btn-acd',
            id:     'flat',
            label:  'b',
        },
        {
            name:   'toolbar-btn-acd',
            id:     'dflat',
            label:  'bb',
        },
    ];

    var toggle_toolbar_currents = function() {
        Ava.Utils.toggle_button('toolbar-btn-dur-' + Ava.Context.cd());
    };

    var bind_click_to_durs = function() {
        // Douglas Crockford - The Good Parts - p39
        // Populating functions based on variables
        var helper = function(btn_id, dot_id) {
            return function(event) {
                try {
                    // Set current duration
                    Ava.Context.cd(btn_id);
                } catch (e) {
                    console.log(e);
                }
                // reset dot buttons
                Ava.Utils.get_btn_group( dot_id )
                    .button('toggle');
            };
        };

        // Need to get the first id so that later be able to reach to its parent
        var dot = _.first( dur_btns.dots );
        var dot_element_id = dot.name + '-' + dot.id;
        _.each( dur_btns.durs, function(btn, dot) {
            var btn_id = btn.name + '-' + btn.id;
            Ava.Utils.bind_click_to_button( btn_id, helper(btn.id, dot_element_id) );
        });
    };

    ( function(spec) {

        var View = Backbone.View.extend({

            template: _.template( tmpl ),

            /**
             * @method render
             **/
            render: function() {
                this.$el.append( this.template({
                    dur_btns:         dur_btns,
                    accidental_btns:  accidental_btns,
                }) );

                // Toggle toolbar keys based on defaults values
                toggle_toolbar_currents();

                // Bind onclick event
                bind_click_to_durs();


                return this;
            },

        });

        that = new View(spec);

    })(spec);

    return that;
};
