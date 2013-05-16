/*
 * Beam
 *
 */

Ava.BeamModel = Backbone.Model.extend({
    initialize: function() {
        if (typeof this.get('notes') !== 'object') {
            throw {
                name: 'invalidParam',
                message: 'Passed invalid parameter. notes have to be an array',
            };
        }

        if (this.get('notes').length <= 1) {
            throw {
                name: 'insufficentParam',
                message: 'The length of notes array has to be more than 1',
            };
        }

        // Init list of notes
        this.set( 'notes', new Ava.TickableList(this.get('notes')) );
    },
});

Ava.BeamList = Backbone.Collection.extend({
    model: Ava.BeamModel,
});

Ava.Beam = function (spec) {
    var that = new Ava.BeamModel(spec);
    return that;
};
