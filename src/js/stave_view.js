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

        var y_of_line;
        for (var line=-4; line<=8; line+=.5) {
            y_of_line = that.vex_stave.getYForLine(line);
            if ( y_of_line >= that.vex_stave.y) {
                _y_map_line[y_of_line] = line;
            }
        }
    };

    /**
     * @method get_y_hot_spot
     * @param y
     **/
    that.get_y_hot_spot = function( y ) {

        var y0, sign, res, result;
        var fact = 5;

        y0 = that.vex_stave.getYForLine(0);
        y = y - y0;
        sign = y >= 0 ? 1 : -1;
        y *= sign;

        res = y - (y % fact);
        result;
        if ( y < res + (fact/2) ) {
            result = sign * res;
        } else {
            result = sign * (res + fact);
        }

        return result + y0;
    };

    /**
     * @method get_line_of
     * @param y
     **/
    that.get_line_of = function( y ) {
        var y_hot = that.get_y_hot_spot(y);

        if (!_.keys(_y_map_line).length) {
            _init_y_map_line();
        }

        return _y_map_line[y];
    };

    return that;
};
