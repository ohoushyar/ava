/*
 * tickable
 */

Ava.Tickable = function (spec) {
    var that = {};

    var note = spec.note;
    var isRemovable = spec.isRemovable || false;
    var x,
        y,
        next,
        prev;

    that.note = note;
    that.isRemovable = isRemovable;
    that.x = x;
    that.y = y;
    that.next = next;
    that.prev = prev;

    return that;
};
