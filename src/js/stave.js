/**
 * Stave model
 * @example
 *      stave = Ava.Stave({
 *          x: 100,
 *          y: 100,
 *          width: 350,
 *          clef: 'bass',
 *          time_signature: '6/8',
 *          key_signature: 'F',
 *      });
 * @class Ava.Stave
 * @constructor
 * @param {Object} spec
 **/
Ava.Stave = function (spec) {
    var that = {};

    (function(spec) {
        var Model = Backbone.Model.extend({
            defaults: function() {
                return {
                    /**
                     * @attribute x
                     * @type {Number}
                     * @default 0
                     * @optional
                     **/
                    x: 0,

                    /**
                     * @attribute y
                     * @type {Number}
                     * @default 0
                     * @optional
                     **/
                    y: 0,

                    /**
                     * @attribute width
                     * @type {Number}
                     * @default 250
                     * @optional
                     **/
                    width: 250,

                    /**
                     * Set of this attribute will cause the view to show it
                     * @attribute clef
                     * @type {String}
                     * @optional
                     **/
                    clef: undefined,

                    /**
                     * Set of this attribute will cause the view to show it
                     * @attribute time_signature
                     * @type {String}
                     * @optional
                     **/
                    time_signature: undefined,

                    /**
                     * Set of this attribute will cause the view to show it
                     * @attribute key_signature
                     * @type {String}
                     * @optional
                     **/
                    key_signature: undefined,
                };
            },

            initialize: function() {

                if ( typeof this.get('clef') === 'string'
                    && !_.include(Ava.valid_clefs, this.get('clef')) ) {
                    throw {
                        name: 'initError',
                        message: 'Invalid clef',
                    };
                }

                if ( typeof this.get('key_signature') === 'string'
                    && !_.include(Ava.valid_key_signatures, this.get('key_signature')) ) {
                    throw {
                        name: 'initError',
                        message: 'Invalid key_signature',
                    };
                }

            },

        });

        that = new Model(spec);
    })(spec);

    /**
     * Change the x and y value of stave to given value
     * @method move_to
     * @param {Number} x
     * @param {Number} y
     * @chainable
     **/
    that.move_to = function(x, y) {
        if ( typeof x !== 'number' || typeof y !== 'number' ) {
            throw {
                name: 'invalidParam',
                message: 'x and y have to be number',
            };
        }

        that.set('x', x);
        that.set('y', y);

        return that;
    };

    /**
     * Get the value of current positions on context and set the stave
     * values.
     * @method move_to_current_pos
     * @chainable
     **/
    that.move_to_current_pos = function() {
        that.move_to(Ava.Context.current_x(), Ava.Context.current_y());
        return that;
    };

    return that;
};
