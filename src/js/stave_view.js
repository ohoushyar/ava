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

        var stave = new Vex.Flow.Stave( this.model.x, this.model.y );

        if (typeof this.model.clef === 'string'){
            stave.addClef( this.model.clef );
            this.model.width += 20;
        }

        if (typeof this.model.time_signature === 'string'){
            stave.addTimeSignature( this.model.time_signature );
            this.model.width += 20;
        }

        if (typeof this.model.key_signature === 'string'){
            stave.addKeySignature( this.model.key_signature );
            this.model.width += 20;
        }

        stave.setWidth(this.model.width)
        stave.setContext( this.model.ctx ).draw();

        this.vex_stave = stave;

        return this;
    },

});
