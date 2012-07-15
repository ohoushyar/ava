/*
 * Ava test helper
 */
var avaTestHelper = (function() {
    var that = {};

    var last_container_num = Math.round(new Date().getTime()/1000.0);
    var unittest_div_prefex = 'unittest-';

    var elements = function(div_id) {
        var html = '<div id="' + div_id + "-title" + '"></div>';
        html += '<div id="' + div_id + "-canvas" + '"></div>';

        return html;
    };

    that.init_env = function() {
        last_container_num += 1;
        var unittest_div_id = unittest_div_prefex + last_container_num;

        var unittest_div_html = '<div id="' + unittest_div_id + '">'
        unittest_div_html += elements(unittest_div_id);
        unittest_div_html += '</div>';

        $("#test-env").html($("#test-env").html() + unittest_div_html);

        var unittest_div = $('#'+unittest_div_id);

        var canvas = $("#"+unittest_div_id+"-canvas");
        canvas.addClass("ut-canvas");

        var title = $("#"+unittest_div_id+"-title");
        title.addClass('ut-title');

        var renderer = new Vex.Flow.Renderer(canvas[0], Vex.Flow.Renderer.Backends.RAPHAEL);

        return {
            div_id: unittest_div_id,
            title: title,
            canvas: canvas,
            canvas_id: unittest_div_id+'-canvas',
            renderer: renderer,
            ctx: renderer.getContext(),
            hide: function() {
                unittest_div.hide();
            }
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


