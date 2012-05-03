/*
 * Ava
 */
Ava = ( function () {
    var that = {};

    that.Context = (function () {
            var currDuration = 'w';

            return {
                currentDuration: function (duration) {

                    if (typeof duration !== 'undefined') {
                        if (typeof duration !== 'string') {
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

