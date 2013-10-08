/*
 * Cursor is a kind of rectangle which would show the place of element which would place on the bar.
 *
 * @example
 *      cursor = Ava.Cursor({
 *          x:       10,
 *          y:       10,
 *          width:   10,
 *          height:  20
 *      });
 *
 * @class Ava.Cursor
 * @constructor
 * @param {Object} spec An object to init a cursor
 * @extend Backbone.Model
 */
Ava.Cursor = function (spec) {
    var that = {};

    (function(spec) {
        var CursorModel = Backbone.Model.extend({
            defaults: function() {
                return {
                    /**
                     * Cursor x
                     * @attribute x
                     * @type {Number}
                     * @default 0
                     * @optional
                     **/
                    x: 0,

                    /**
                     * Cursor y
                     * @attribute y
                     * @type {Number}
                     * @default 0
                     * @optional
                     **/
                    y: 0,

                    /**
                     * Cursor width
                     * @attribute width
                     * @type {Number}
                     * @default (defined in Ava.Constant)
                     * @optional
                     **/
                    width: Ava.Constant.CURSOR_DEFAULT_WIDTH,

                    /**
                     * Cursor height
                     * @attribute height
                     * @type {Number}
                     * @default (defined in Ava.Constant)
                     * @optional
                     **/
                    height: Ava.Constant.CURSOR_DEFAULT_HEIGHT,

                    /**
                     * Cursor hide flag
                     * @attribute hide
                     * @type {Boolean}
                     * @default false
                     * @optional
                     **/
                    hide: false,
                };
            },

        });

        that = new CursorModel(spec);

    })(spec);

    /**
     * @method move
     * @param {Number} x
     * @param {Number} y
     **/
    that.move = function(x, y) {
        that.set('x', x);
        that.set('y', y);
    };

    /**
     * @method resize
     * @param {Number} w width
     * @param {Number} h height
     **/
    that.resize = function(w, h) {
        that.set('width', w);
        that.set('height', h);
    };

    /**
     * @method hide
     **/
    that.hide = function() {
        that.set('hide', true);
    };

    /**
     * @method show
     **/
    that.show = function() {
        that.set('hide', false);
    };

    return that;
};
