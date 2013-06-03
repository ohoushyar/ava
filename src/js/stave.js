/**
 * Stave model
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
                    x: 0,
                    y: 0,
                    width: 250,
                    clef: undefined,
                    time_signature: undefined,
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

    return that;
};
