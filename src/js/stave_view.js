/**
 * Stave View
 * @example
 *      view = Ava.StaveView({
 *          // mod, required attribute to init stave model
 *          model: Ava.Stave(mod),
 *      });
 *
 * @class Ava.StaveView
 * @constructor
 * @param {Object} spec
 * @uses Ava.Context
 * @uses Ava.Stave
 * @extends Backbone.View
 */
Ava.StaveView = function(spec) {
    var that = {};

    (function(spec) {
        var View = Backbone.View.extend({

            /**
             * @method render
             * @chainable
             **/
            render: function() {
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
                stave.setContext( Ava.Context.vexflow_ctx() ).draw();

                this.vex_stave = stave;

                return this;
            },

        });

        that = new View(spec);
    })(spec);

    return that;
};
