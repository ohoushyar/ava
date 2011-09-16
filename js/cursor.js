/*
 * cursor
 *
 * Cursor class which would show curosr on demand
 */
Ava.Cursor = function (spec) {
    var that = {};

    var ctx = spec.ctx;
    var x = spec.x;
    var y = spec.y;
    var width = spec.width || 16.5;
    var height = spec.height || 140;

    var rect = ctx.paper.rect(x, y, width, height);
    rect.attr({fill:"#000", opacity: 0.2});
    rect.hide();

    var move = function (x, y) {
        rect.hide();
        rect.attr({x: x, y: y});
        rect.show();
    };

    that._x = x;
    that._y = y;

    that.show = function () { rect.show() };
    that.hide = function () { rect.hide() };
    that.toFront = function () { rect.toFront() };
    that.move = move;

    return that;
};
