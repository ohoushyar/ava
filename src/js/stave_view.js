/*
 * Stave View
 */
Ava.StaveView = Backbone.View.extend({

    render: function() {
        if (typeof this.model.ctx !== 'object') {
            throw {
                name: 'invalidParam',
                message: 'Invalid context (ctx)',
            };
        }

        var stave = new Vex.Flow.Stave( this.model.x, this.model.y, this.model.width );

        if (typeof this.model.clef === 'string'){
            stave.addClef( this.model.clef );
        }

        stave.setContext( this.model.ctx ).draw();

        return this;
    },

});
