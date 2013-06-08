/**
 * @module Ava
 * @class Ava
 * @constructor
 **/
Ava = ( function () {
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

    /**
     * @class Ava.Context
     * @constructor
     **/
    that.Context = (function () {
        var curr_duration = 'w';
        var vexflow_context_div_id;
        var vexflow_context = {};
        var curr_x, curr_y;
        curr_x = curr_y = 0;


        return {
            current_duration: function(duration) {

                if (typeof duration !== 'undefined') {
                    if ($.inArray(!isNaN(duration) ? parseInt(duration) : duration, that.valid_duration) == -1) {
                        throw {
                            name: 'typeError',
                            message: "Invalid duration. Duration needs to be char"
                        }
                    }

                    curr_duration = duration;
                }

                return curr_duration;
            },


            /**
             * A global accessor to get/set ctx div id.
             * @method vexflow_ctx_div_id
             * @static
             * @param {String} div_id
             * @return {String} div_id
             **/
            vexflow_ctx_div_id: function(div_id) {
                if ( typeof div_id !== 'undefined' ) {
                    if ( !(typeof div_id === 'string' && $("#"+div_id).length) ) {
                        throw {
                            name: 'invalidParam',
                            message: 'Invalid param. div_id has to be string or div is not valid',
                        }
                    }

                    vexflow_context_div_id = div_id;
                }

                return vexflow_context_div_id;
            },

            /**
             * A global accessor to get/set ctx.
             * @method vexflow_ctx
             * @static
             * @param {Object} ctx Vex.Flow.Renderer
             * @return {Object} Vex.Flow.Renderer
             **/
            vexflow_ctx: function(ctx) {

                if (typeof ctx !== 'undefined') {
                    if (typeof ctx !== 'object') {
                        throw {
                            name: 'invalidParam',
                            message: 'Invalid param. ctx has to be object',
                        }
                    }

                    vexflow_context[vexflow_context_div_id] = ctx;
                }

                // build context
                if ( typeof vexflow_context[vexflow_context_div_id] === 'undefined') {
                    if ( !(typeof vexflow_context_div_id === 'string'
                        || $("#"+vexflow_context_div_id).length) ) {
                        throw {
                            name: 'invalidDiv',
                            message: 'Invalid div for context',
                        }
                    }

                    vexflow_context[vexflow_context_div_id] = Vex.Flow.Renderer.buildContext( vexflow_context_div_id, Vex.Flow.Renderer.Backends.RAPHAEL, Ava.Constant.DEFAULT_WIDTH, Ava.Constant.DEFAULT_HEIGHT);
                }

                return vexflow_context[vexflow_context_div_id];
            },

            /**
             * @method current_x
             * @static
             * @param {Number} x
             * @return {Number}
             **/
            current_x: function(x) {
                if (typeof x === 'number') {
                    curr_x = x;
                }

                return curr_x;
            },

            /**
             * @method current_y
             * @static
             * @param {Number} y
             * @return {Number}
             **/
            current_y: function(y) {
                if (typeof y === 'number') {
                    curr_y = y;
                }

                return curr_y;
            },
        };
    }() );

    return that;
}() );

