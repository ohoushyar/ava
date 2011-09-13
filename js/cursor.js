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
    var height = spec.height || 150;

    var rect = ctx.paper.rect(x, y, width, height);
    rect.attr({fill:"rgba(200,0,0,0.4)", opacity: 0.5});
    rect.hide();

    var show = function () {
        rect.show();
    };
    var hide = function () {
        rect.hide();
    };

    var move = function (x, y) {
        return 1;
    };

    that.show = show;
    that.hide = hide;
    that.move = move;

    return that;
};
