/**
 * Music View
 * @class Ava.MusicView
 * @constructor
 * @param {Object} spec
 * @extends Backbone.View
 **/
Ava.MusicView = function(spec) {
    var that = {};

    (function(spec){
        var View = Backbone.View.extend({

            initialize: function() {
            },

            /**
             * @method render
             **/
            render: function() {
                // Run views of each bar
                this.model.get('bars').forEach( this._render_bar, this);

                // I can set the width of ctx to default and 

                return this;
            },

            /**
             * @method _render_bar
             * @param {Object} Ava.Bar
             * @private
             **/
            _render_bar: function(bar) {
                var bar_model = Ava.Bar(bar)
                // every time set x and y of a new bar according to ctx or perhaps
                // previous bar position which would be x + width
                bar_model.set_x(Ava.Context.current_x);
                bar_model.set_y(Ava.Context.current_y);

                var bar_view = Ava.BarView( {model: bar_model} );

                bar_view.render();
            },

        });

        that = new View(spec);
    })(spec);

    return that;
};
