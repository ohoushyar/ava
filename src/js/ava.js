/**
 * @module Ava
 * @class Ava
 * @constructor
 **/
Ava = ( function () {
    var that = {};

    that.Constant = {
        CANVAS:  'canvas',
        RAPHAEL: 'raphael',
        BAR_DEFAULT_WIDTH: 300,
        BAR_DEFAULT_HEIGHT: 120,
        BAR_CONTEXT_EXTRA_WIDTH: 5,
        DEFAULT_WIDTH: 1024,
        DEFAULT_HEIGHT: 120,
    };

    that.valid_duration = ['w', 'h', 'q', 8, 16, 32, 64];
    that.valid_clefs = ["treble", "bass", "alto", "tenor", "percussion"];
    that.valid_key_signatures = ["C", "Am", "F", "Dm", "Bb", "Gm", "Eb", "Cm", "Ab", "Fm", "Db", "Bbm", "Gb", "Ebm", "Cb", "Abm", "G", "Em", "D", "Bm", "A", "F#m", "E", "C#m", "B", "G    #m", "F#", "D#m", "C#", "A#m"];

    /**
     * @class Ava.Context
     * @constructor
     **/
    that.Context = (function () {
        var curr_duration = 'w';
        var vexflow_context_div_id;
        var vexflow_context;

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
                    vexflow_context = ctx;
                }

                if ( typeof vexflow_context === 'undefined'
                    && !(typeof vexflow_context_div_id === 'string'
                        || $("#"+vexflow_context_div_id).length) ) {
                    throw {
                        name: 'invalidDiv',
                        message: 'Invalid div for context',
                    }
                } else {
                    vexflow_context = Vex.Flow.Renderer.buildContext( vexflow_context_div_id, Vex.Flow.Renderer.Backends.RAPHAEL, Ava.Constant.DEFAULT_WIDTH, Ava.Constant.DEFAULT_HEIGHT);
                }

                return vexflow_context;
            },
        };
    }() );

    return that;
}() );

