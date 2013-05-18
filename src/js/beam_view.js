/*
 * Beam View
 */
Ava.BeamView = Backbone.View.extend({

    initialize: function() {

        if (! (_.isArray(this.model.get('notes')) && this.model.get('notes').length > 1) ) {
            throw {
                name: 'invalidParam',
                message: 'Invalid notes. It has to be an Array and has to have more than one element',
            };
        }

        if (typeof this.model.get('ctx') !== 'object') {
            throw {
                name: 'invalidParam',
                message: 'Invalid context (ctx)',
            };
        }

        this.vex_beam = new Vex.Flow.Beam( this.model.get('notes') );
    },

    // This can run after voice draw
    render: function() {
        this.vex_beam.setContext( this.model.get('ctx') ).draw();
        return this;
    },

});
