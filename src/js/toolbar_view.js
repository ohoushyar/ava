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
    tmpl    += '            <button type="button" class="btn btn-default navbar-btn" data-toggle="button">';
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
    tmpl    += '    <% _.each(["times", "dots"], function(grp) { %>';
    tmpl    += '        <div class="btn-group" data-toggle="buttons">';
    tmpl    += '        <% _.each( time_btns[grp], function(btn) { %>';
    tmpl    += '            <label class="btn btn-default navbar-btn"><input type="radio" name="<%= btn.name %>" id="nav-btn-acd-<%= btn.id %>"><%= btn.label %></label>';
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

    var time_btns = {
        times: [
            {
                name:   'toolbar-btn-time',
                id:     '64',
                label:  '64th',
            },
            {
                name:   'toolbar-btn-time',
                id:     '32',
                label:  '32th',
            },
            {
                name:   'toolbar-btn-time',
                id:     '16',
                label:  '16th',
            },
            {
                name:   'toolbar-btn-time',
                id:     '8',
                label:  '8th',
            },
            {
                name:   'toolbar-btn-time',
                id:     '4',
                label:  '4th/q',
            },
            {
                name:   'toolbar-btn-time',
                id:     '2',
                label:  '2nd/h',
            },
            {
                name:   'toolbar-btn-time',
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

    ( function(spec) {

        var View = Backbone.View.extend({

            template: _.template( tmpl ),

            /**
             * @method render
             **/
            render: function() {
                this.$el.append( this.template({
                    time_btns:        time_btns,
                    accidental_btns:  accidental_btns,
                }) );

                return this;
            },

        });

        that = new View(spec);

    })(spec);

    return that;
};
