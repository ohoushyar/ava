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
    tmpl    += '        <% _.each( time_btns, function(btn) { %>';
    tmpl    += '            <button type="button" class="btn btn-default navbar-btn" id="nav-btn-acd-<%= btn.id %>"><%= btn.label %></button>';
    tmpl    += '        <% }); %>';
    tmpl    += '        </div>';

    tmpl    += '        <div class="btn-group">';
    tmpl    += '            <button type="button" class="btn btn-default navbar-btn" id="nav-btn-rest-toggle">';
    tmpl    += '                <span id="nav-btn-rest-toggle-img">R</span>';
    tmpl    += '            </button>';
    tmpl    += '        </div>';

    // Accidentals
    tmpl    += '        <div class="btn-group">';
    tmpl    += '        <% _.each( accidental_btns, function(btn) { %>';
    tmpl    += '            <button type="button" class="btn btn-default navbar-btn" id="nav-btn-acd-<%= btn.id %>"><%= btn.label %></button>';
    tmpl    += '        <% }); %>';
    tmpl    += '        </div>';

    tmpl    += '    </nav>';

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
            label:  '4th/q',
        },
        {
            id:     '2',
            label:  '2nd/h',
        },
        {
            id:     '1',
            label:  '1/w',
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

    ( function(spec) {

        var View = Backbone.View.extend({

            template: _.template( tmpl ),

            /**
             * @method render
             **/
            render: function() {
                this.$el.append( this.template({
                    time_btns:          time_btns,
                    accidental_btns:    accidental_btns,
                }) );

                return this;
            },

        });

        that = new View(spec);

    })(spec);

    return that;
};
