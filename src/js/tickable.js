/*
 * tickable
 * TODO:
 * - note should initialize here with parameter has been passed rather
 *   than passing vexflow stavenote
 */

Ava.Tickable = function (spec) {
    var that = {};

    (function(spec) {
        if (!(typeof spec.keys === 'object' && typeof spec.duration === 'string')) {
            throw {
                name: 'initError',
                message: 'Invalid params',
            };
        }

        that.duration = spec.duration;
        that.note = new Vex.Flow.StaveNote({ keys: spec.keys, duration: spec.duration }),
        that.isRemovable = spec.isRemovable || false;
     }(spec));

    var x,
        y;


    return that;
};
