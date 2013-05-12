/*
 * stave
 * TODO:
 * - note should initialize here with parameter has been passed rather
 *   than passing vexflow stavenote
 */

Ava.StaveModel = Backbone.Model.extend({
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
    },
});

Ava.Stave = function (spec) {
    var that = new Ava.StaveModel(spec);

    return that;
};
