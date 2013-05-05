/*
 * tickable
 * TODO:
 * - note should initialize here with parameter has been passed rather
 *   than passing vexflow stavenote
 */

Ava.TickableModel = Backbone.Model.extend({
    defaults: function() {
        return {
            is_removable: false,
        };
    },

    initialize: function() {
        if (!(typeof this.get('keys') === 'object' && typeof this.get('duration') === 'string')) {
            throw {
                name: 'initError',
                message: 'Invalid params',
            };
        }
    },
});

Ava.TickableList = Backbone.Collection.extend({
    model: Ava.TickableModel,
});

Ava.Tickable = function (spec) {
    var that = new Ava.TickableModel(spec);

    var x,
        y;

    return that;
};
