/*
 * Ava
 */
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

    that.Context = (function () {
        var currDuration = 'w';

        return {
            currentDuration: function (duration) {

                if (typeof duration !== 'undefined') {
                    if ($.inArray(!isNaN(duration) ? parseInt(duration) : duration, that.valid_duration) == -1) {
                        throw {
                            name: 'typeError',
                            message: "Invalid duration. Duration needs to be char"
                        }
                    }

                    currDuration = duration;
                }

                return currDuration;
            },
        };
    }() );

    that.set_vexflow_context = function(ctx) {
        if (typeof ctx !== 'object') {
            throw {
                name: 'invalidParam',
                message: 'Invalid param. ctx has to be object',
            }
        }

        that.Context.vexflow_ctx = ctx;
    };

    return that;
}() );

