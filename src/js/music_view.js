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
                this.model.get('bars').on('add', this.render, this);
                //this.model.on("change:dirty", this.render, this);
            },

            /**
             * @method add_bar
             * @param {Object} spec Ava.Bar
             **/
            add_bar: function(spec) {
                this.model.add_bar( Ava.Bar(spec) );
            },

            /**
             * @method render
             **/
            render: function() {
                if (this.model.is_dirty()) {
                    // Clear the ctx
                    Ava.Context.vexflow_ctx().clear();
                    // Reset current x and y
                    Ava.Context.reset_currents();
                    // Not dirty anymore
                    this.model.unset_dirty();
                }

                // Run views of each bar
                this.model.get('bars').forEach( this._render_bar, this);
                return this;
            },

            /**
             * @method _render_bar
             * @param {Object} Ava.Bar
             * @private
             **/
            _render_bar: function(bar) {
                var bar_model = bar;
                // every time set x and y of a new bar according to ctx or perhaps
                // previous bar position which would be x + width
                bar_model.set_x(Ava.Context.current_x());
                bar_model.set_y(Ava.Context.current_y());

                var bar_view = Ava.BarView( {model: bar_model} );

                bar_view.render();
            },

        });

        that = new View(spec);
    })(spec);

    return that;
};
