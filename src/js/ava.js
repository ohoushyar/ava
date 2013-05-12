/*
 * Ava
 */
Ava = ( function () {
    var that = {};
    that.Constant = {
        CANVAS:  'canvas',
        RAPHAEL: 'raphael',
    };

    that.valid_duration = ['w', 'h', 'q', 8, 16, 32, 64];
    that.valid_clefs = ["treble", "bass", "alto", "tenor", "percussion"];

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


    return that;
}() );

