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

    var _y_map_line = {};
    /**
     * Init _y_map_line (y to line number map)
     *
     * @method _init_y_map_line
     * @private
     **/
    var _init_y_map_line = function() {
        if (!that.vex_stave) {
            throw {
                name: 'invalidVexStave',
                message: 'vex_stave is not defined. Need to run render first'
            };
        }

        // To get the y of note one needs to get the note key props and uses
        // the line in that and passes it to stave getYForNote
        var note_key_props =  Ava.Context.get_vexflow_all_notes_properties( Ava.Context.cc );
        _.each( note_key_props, function( key_props ) {
            _y_map_line[ that.vex_stave.getYForNote( key_props.line ) ] = key_props.line;
        });

        // console.debug( 'y_map_line: ' );
        // console.debug( _y_map_line );
    };

    /**
     * Find the hot spot for passed y
     * What is hot spot? Hot spot is the exact y for a line which calculate
     * based on passed y.
     *
     * @method get_y_hot_spot
     * @param y
     **/
    that.get_y_hot_spot = function( y ) {

        var y0, sign, result;
        var fact = 5;

        y0 = that.vex_stave.getYForNote(9);
        console.debug('line #0 y (y0): ' + y0);

        y = y - y0;
        console.debug('y - y0: ' + y);

        sign = y >= 0 ? 1 : -1;
        y *= sign;

        var mod = (y % fact);
        console.debug( 'mod: ' + mod );
        result;
        if ( mod < (fact/2) ) {
            result = sign * ( y - mod );
        } else {
            result = sign * ( y + (fact - mod) );
        }

        return result + y0;
    };

    /**
     * Return line number relative to y.
     *
     * @method get_line_by_y
     * @param y
     **/
    that.get_line_by_y = function( y ) {
        console.debug( 'y: ' + y );
        var y_hot = that.get_y_hot_spot(y);
        console.debug( 'y_hot of y: ' + y_hot );

        if (!_.keys(_y_map_line).length) {
            _init_y_map_line();
        }

        return _y_map_line[y_hot];
    };

    return that;
};
