/*
 * tickable
 */

Ava.Tickable = function (spec) {
    var that = {};

    var note = spec.note;
    var x,
        y,
        next,
        prev;

    that.note = note;
    that.x = x;
    that.y = y;
    that.next = next;
    that.prev = prev;

    return that;
};
