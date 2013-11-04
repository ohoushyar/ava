/**
 * Utilities for common functionalities.
 * @class Ava.Utils
 * @constructor
 **/
Ava.Utils = ( function() {
    var that = {};

    /**
     * Toggle bootstrap group button via javascript
     * @method toggle_button
     * @params {String} btn_id button id
     * @static
     * @final
     **/
    that.toggle_button = function(btn_id) {
        var $btn = $('#'+btn_id);

        if (!$btn.length) {
            throw {
                name: 'invalidElement',
                message: 'Invalid element found by id [' + btn_id + ']',
            };
        }

        if (!$btn.hasClass('btn')) {
            $btn = $btn.closest('.btn');
        }

        $btn.button('toggle');
    };

    return that;
})();
