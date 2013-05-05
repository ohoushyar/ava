/*
 * Ava test helper
 */
var ava_test_helper = (function() {
    var that = {};

    var last_container_num = Math.round(new Date().getTime()/1000.0);
    var unittest_div_prefex = 'unittest-';

    var elements = function(div_id) {
        if ( div_id === undefined )
            alert('ERROR: no div_id');

        return $( '<div id="' + div_id + '"></div>' );
    };

    that.init_env = function() {
        last_container_num += 1;
        var unittest_div_id = unittest_div_prefex + last_container_num;

        var $unittest_div_element = $( '<div id="' + unittest_div_id + '"></div>' );
        $unittest_div_element.append( elements(unittest_div_id + '-title') );
        $unittest_div_element.append( elements(unittest_div_id + '-canvas') );

        $("#test-env").append($unittest_div_element);

        var $unittest_div = $('#'+unittest_div_id);

        var $canvas = $("#"+unittest_div_id+"-canvas");
        $canvas.addClass("ut-canvas");

        var $title = $("#"+unittest_div_id+"-title");
        $title.addClass('ut-title');

        var renderer = new Vex.Flow.Renderer($canvas[0], Vex.Flow.Renderer.Backends.RAPHAEL);

        return {
            $div: $unittest_div_element,
            div_id: unittest_div_id,
            $title: $title,
            $canvas: $canvas,
            canvas_id: unittest_div_id+'-canvas',
            renderer: renderer,
            ctx: renderer.getContext(),
        };
    };

    // Init

    that.run_all = function() {
        avaTest();
        view_test();
        bar_test();
        // containerTest();
        tickable_test();
    };

    return that;
}());


