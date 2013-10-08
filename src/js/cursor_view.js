/**
 * Cursor View
 * @example
 *      view = Ava.CursorView({
 *          // mod is required attribute to init a Cursor model
 *          model: Ava.Cursor(mod),
 *      });
 *
 * @class Ava.CursorView
 * @constructor
 * @param {Object} spec
 * @uses Ava.StaveView
 * @extends Backbone.View
 **/
Ava.CursorView = function(spec) {

    var that = {};

    ( function(spec) {

        var View = Backbone.View.extend({

            initialize: function() {
                this.model.on('change', this._rerender, this);
            },


            // TODO
            /**
             * @method hide
             **/
            hide: function() {
                this.model.hide();
            },

            /**
             * @method show
             **/
            show: function() {
                this.model.show();
            },

            /**
             * @method move
             **/
            move: function(x, y) {
                this.model.move(x, y);
            },

            /**
             * @method resize
             **/
            resize: function(w, h) {
                this.model.resize(w, h);
            },

            /**
             * @method resize_and_move
             **/
            resize_and_move: function(w, h, x, y) {
                this.model.resize(w, h);
                this.model.move(x, y);
            },

            /**
             * @method: _rerender
             * @private
             **/
            _rerender: function() {
                this.rect.hide();
                this.render();
            },

            /**
             * @method render
             **/
            render: function() {

                var x      = this.model.get('x');
                var y      = this.model.get('y');
                var width  = this.model.get('width');
                var height = this.model.get('height');

                var ctx   = Ava.Context.vexflow_ctx();
                this.rect = ctx.paper.rect(x, y, width, height);
                this.rect.attr({fill:"#000", opacity: 0.2});

                var hide   = this.model.get('hide');
                if (hide) {
                    this.rect.hide();
                } else {
                    this.rect.show();
                }

                return this;
            },

        });

        that = new View(spec);

    })(spec);

    return that;
};
