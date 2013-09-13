/**
 * @module Ava
 * @class Ava
 * @constructor
 **/
Ava = ( function() {
    var that = {};

    that.Constant = {

        /**
         * @property Constant.CANVAS
         * @type {String}
         * @static
         * @final
         **/
        CANVAS:  'canvas',

        /**
         * @property Constant.RAPHAEL
         * @type {String}
         * @static
         * @final
         **/
        RAPHAEL: 'raphael',

        /**
         * @property Constant.BAR_DEFAULT_WIDTH
         * @type {Number}
         * @static
         * @final
         **/
        BAR_DEFAULT_WIDTH: 300,

        /**
         * @property Constant.BAR_WIDTH_CORRECTION
         * @type {Number}
         * @static
         * @final
         **/
        BAR_WIDTH_CORRECTION: 5,

        /**
         * @property Constant.BAR_DEFAULT_HEIGHT
         * @type {Number}
         * @static
         * @final
         **/
        BAR_DEFAULT_HEIGHT: 120,

        /**
         * App default width
         * @property Constant.DEFAULT_WIDTH
         * @type {Number}
         * @static
         * @final
         **/
        DEFAULT_WIDTH: 1024,
    };

    /**
     * @property valid_duration
     * @type {Array} string
     * @static
     * @final
     **/
    that.valid_duration = ['w', 'h', 'q', 8, 16, 32, 64];

    /**
     * @property valid_clefs
     * @type {Array} string
     * @static
     * @final
     **/
    that.valid_clefs = ["treble", "bass", "alto", "tenor", "percussion"];

    /**
     * @property valid_key_signatures
     * @type {Array} string
     * @static
     * @final
     **/
    that.valid_key_signatures = ["C", "Am", "F", "Dm", "Bb", "Gm", "Eb", "Cm", "Ab", "Fm", "Db", "Bbm", "Gb", "Ebm", "Cb", "Abm", "G", "Em", "D", "Bm", "A", "F#m", "E", "C#m", "B", "G    #m", "F#", "D#m", "C#", "A#m"];

    return that;
}() );

/**
 * @class Ava.Context
 * @constructor
 **/
Ava.Context = ( function () {
    var that = {};

    var curr_duration = 'w';
    var curr_div_id;

    /**
     * Accessor to get/set current div id. The context is different for each
     * div_id.
     * @method current_div_id
     * @param {String} div_id
     * @return {String}
     **/
    that.current_div_id = function(div_id) {
        if ( typeof div_id !== 'undefined' ) {
            if( !(typeof div_id === 'string' && $("#"+div_id).length) ) {
                throw {
                    name: 'invalidParam',
                    message: 'Invalid div_id',
                };
            }
            curr_div_id = div_id;
        }

        if ( typeof that[curr_div_id] !== 'object' ) {
            that[curr_div_id] = {};
        }

        return curr_div_id;
    };

    /**
     * @method current_duration
     * @param {String|Number} duration
     * @return {String|Number}
     **/
    that.current_duration = function(duration) {

        if (typeof duration !== 'undefined') {
            if ($.inArray(!isNaN(duration) ? parseInt(duration) : duration, Ava.valid_duration) == -1) {
                throw {
                    name: 'typeError',
                    message: "Invalid duration. Duration needs to be char"
                }
            }

            curr_duration = duration;
        }

        return curr_duration;
    };



    /**
     * A global accessor to get/set ctx.
     * @method vexflow_ctx
     * @static
     * @param {Object} ctx Vex.Flow.Renderer
     * @return {Object} Vex.Flow.Renderer
     **/
    that.vexflow_ctx = function(ctx) {

        if (typeof ctx !== 'undefined') {
            if (typeof ctx !== 'object') {
                throw {
                    name: 'invalidParam',
                    message: 'Invalid param. ctx has to be object',
                }
            }

            that[curr_div_id].vexflow_context = ctx;
        }

        // build context
        if ( typeof that[curr_div_id].vexflow_context === 'undefined') {
            if ( !(typeof curr_div_id === 'string'
                || $("#"+curr_div_id).length) ) {
                throw {
                    name: 'invalidDiv',
                    message: 'Invalid div for context',
                }
            }

            that[curr_div_id].vexflow_context = Vex.Flow.Renderer.buildContext( curr_div_id, Vex.Flow.Renderer.Backends.RAPHAEL, Ava.Constant.DEFAULT_WIDTH, Ava.Constant.DEFAULT_HEIGHT);
        }

        return that[curr_div_id].vexflow_context;
    };

    /**
     * @method current_x
     * @static
     * @param {Number} x
     * @return {Number}
     **/
    that.current_x = function(x) {
        if (typeof x === 'number') {
            that[curr_div_id].curr_x = x;
        }

        if (typeof x !== 'number' && typeof that[curr_div_id].curr_x === 'undefined') {
            that[curr_div_id].curr_x = 0;
        }

        return that[curr_div_id].curr_x;
    };

    /**
     * @method current_y
     * @static
     * @param {Number} y
     * @return {Number}
     **/
    that.current_y = function(y) {
        if (typeof y === 'number') {
            that[curr_div_id].curr_y = y;
        }

        if (typeof y !== 'number' && typeof that[curr_div_id].curr_y === 'undefined') {
            that[curr_div_id].curr_y = 0;
        }

        return that[curr_div_id].curr_y;
    };

    /**
     * @method reset_currents
     * @static
     **/
    that.reset_currents = function() {
        that[curr_div_id].curr_x = 0;
        that[curr_div_id].curr_y = 0;
    };

    return that;
} )();
