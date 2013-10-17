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
                that.bars.push(bar_view);

            },

        });

        that = new View(spec);
        that.bars = [];
    })(spec);

    /**
     * Return BarView object of passed x and y
     * TODO: It could accept y when we have wrap enable
     *
     * @method get_bar_view_of
     * @param {Number} x
     * @return {Object} Ava.BarView
     **/
    that.get_bar_view_of = function( x ) {
        var bar_x, bar_w, i;

        if ( typeof x === 'undefined' ) {
            throw {
                name: 'reqParam',
                message: "x is required"
            };
        }

        for (i=0; i < that.bars.length; i+=1) {
             bar_x = that.bars[i].model.get('x');
             bar_w = that.bars[i].model.get('width');
            if (x >= bar_x && x < bar_x + bar_w) {
                return that.bars[i];
            }
        }

        throw {
            name: 'outOfRange',
            message: "No bar found for x: " + x,
        };
    };

    return that;
};
