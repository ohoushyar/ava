/**
 * Utilities for common functionalities.
 * @class Ava.Utils
 * @constructor
 **/
Ava.Utils = ( function() {
    var that = {};

    /**
     * @method
     * @private
     * @param {String} btn_id button id
     * @return {jQuery}
     **/
    var get_jq_btn = function( btn_id ) {
        var $btn = $('#'+btn_id);

        if (!$btn.length) {
            throw {
                name: 'invalidElement',
                message: 'Invalid element found by id [' + btn_id + ']',
            };
        }

        return $btn;
    };

    /**
     * Workaround to find bootstrap button element
     * @method get_btn_element
     * @param {String} btn_id button id
     * @return {jQuery}
     * @static
     * @final
     **/
    var get_btn_element = function(btn_id) {
        var $btn = get_jq_btn( btn_id );

        if (!$btn.hasClass('btn')) {
            $btn = $btn.closest('.btn');
        }

        return $btn;
    };

    /**
     * Get btn-group element of a button
     * @method get_bth_group
     * @param {String} btn_id button id
     * @return {jQuery}
     * @static
     * @final
     **/
    var get_btn_group = function(btn_id) {
        var $btn = get_jq_btn( btn_id );
        return $btn.closest('.btn-group');
    };

    /**
     * Toggle bootstrap group button via javascript
     * @method toggle_button
     * @param {String} btn_id button id
     * @static
     * @final
     **/
    var toggle_button = function(btn_id) {
        var $btn = get_btn_element( btn_id );
        $btn.button('toggle');
    };

    /**
     * Bind click event on bootstrap buttons
     * @method bind_click_to_button
     * @param {String} btn_id button id
     * @static
     * @final
     **/
    var bind_click_to_button = function( btn_id, func ) {
        var $btn = get_btn_element( btn_id );
        $btn.click( func );
    };

    // make them public
    that.get_btn_element      = get_btn_element;
    that.get_btn_group        = get_btn_group;
    that.toggle_button        = toggle_button;
    that.bind_click_to_button = bind_click_to_button;

    return that;
})();
