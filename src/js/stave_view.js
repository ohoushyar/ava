/*
 * Stave View
 */
Ava.StaveView = Backbone.View.extend({

    render: function() {
        if (typeof this.model.get('ctx') !== 'object') {
            throw {
                name: 'invalidParam',
                message: 'Invalid context (ctx)',
            };
        }

        var stave = new Vex.Flow.Stave( this.model.get('x'), this.model.get('y') );

        if (typeof this.model.get('clef') === 'string'){
            stave.addClef( this.model.get('clef') );
            this.model.set('width', this.model.get('width') + 20);
        }

        if (typeof this.model.get('time_signature') === 'string'){
            stave.addTimeSignature( this.model.get('time_signature') );
            this.model.set('width', this.model.get('width') + 20);
        }

        if (typeof this.model.get('key_signature') === 'string'){
            stave.addKeySignature( this.model.get('key_signature') );
            this.model.set('width', this.model.get('width') + 20);
        }

        stave.setWidth(this.model.get('width'))
        stave.setContext( this.model.get('ctx') ).draw();

        this.vex_stave = stave;

        return this;
    },

});
