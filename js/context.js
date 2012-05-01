/*
 * Context
 */
Ava.Context = function (spec) {
    var that = {};

    if (typeof spec.currentDuration !== 'string') {
        throw {
            name: 'typeError',
            message: "Invalid duration. Duration needs to be char"
        }
    }

    var currentDuration = spec.currentDuration;
    var glyph;

    var setCurrentDuration = function (duration) {
        // Sanity check
        if (typeof duration !== 'string') {
            throw {
                name: 'typeError',
                message: "Invalid duration. Duration needs to be char"
            }
        }

        currentDuration = duration;
        that.currentDuration = currentDuration;
    };

    // Public methods
    that.currentDuration = currentDuration;
    that.glyph = glyph;
    that.setCurrentDuration = setCurrentDuration;

    return that;
};
