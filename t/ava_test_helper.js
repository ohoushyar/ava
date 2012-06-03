/*
 * Ava test helper
 */
var avaTestHelper = (function() {
    var that = {};

    var last_container_num = Math.round(new Date().getTime()/1000.0);
    var canvas_prefex = 'vex-canvas-test-helper-';

    that.init_env = function() {
        last_container_num += 1;
        var canvas_id = canvas_prefex + last_container_num;
        var canvas_html = '<div id="' + canvas_id + '"></div>';

        $("#test-env").html($("#test-env").html() + canvas_html);

        var canvas = $("#"+canvas_id)[0];
        var renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.RAPHAEL);

        return {
            canvas_id: canvas_id,
            canvas: canvas,
            renderer: renderer,
            ctx: renderer.getContext(),
        };
    };

    // Init

    that.run_all = function() {
        avaTest();
        measureTest();
        containerTest();
        tickableTest();
    };

    return that;
}());


