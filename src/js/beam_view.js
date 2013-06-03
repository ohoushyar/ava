/*
 * Beam View
 */
Ava.BeamView = function(spec) {
    var that = {};

    (function(spec){
        var View = Backbone.View.extend({

            initialize: function() {

                if (! (_.isArray(this.model.get('notes')) && this.model.get('notes').length > 1) ) {
                    throw {
                        name: 'invalidParam',
                        message: 'Invalid notes. It has to be an Array and has to have more than one element',
                    };
                }

                this.vex_beam = new Vex.Flow.Beam( this.model.get('notes') );
            },

            // This can run after voice draw
            render: function() {
                this.vex_beam.setContext( Ava.Context.vexflow_ctx() ).draw();
                return this;
            },

        });

        that = new View(spec);
    })(spec);

    return that;
};
