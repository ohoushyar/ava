/*
 * Ava test helper
 */
var ava_test_helper = (function() {
    var that = {};

    var last_container_num = Math.round(new Date().getTime()/1000.0);
    var unittest_div_prefex = 'unittest-';
    var unittest_div_id;
    var $unittest_div_element;
    var $title;

    var get_$div = function(div_id) {
        if ( div_id === undefined )
            alert('ERROR: no div_id');

        return $( '<div id="' + div_id + '"></div>' );
    };

    that.get_unittest_div_and_title = function() {
        last_container_num += 1;
        unittest_div_id = unittest_div_prefex + last_container_num;

        $unittest_div_element = $( '<div id="' + unittest_div_id + '"></div>' );
        $title = get_$div(unittest_div_id + '-title');
        $title.addClass('ut-title');
        $unittest_div_element.append( $title );

        $("#test-env").append($unittest_div_element);

        return {
            div_id: unittest_div_id,
            $div: $unittest_div_element,
            $title: $title,
        };
    };

    that.init_env = function() {
        that.get_unittest_div_and_title();

        $unittest_div_element.append( get_$div(unittest_div_id + '-canvas') );

        var $canvas = $("#"+unittest_div_id+"-canvas");
        $canvas.addClass("ut-canvas");

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

    // A view test runner
    that.run_view_test = function( module, submodule, title, func, hide_env) {
        var env = that.init_env();
        env.ctx = Vex.Flow.Renderer.buildContext(env.canvas_id, Vex.Flow.Renderer.Backends.RAPHAEL, 500, 120);
        env.$title.html(module + ' - ' + submodule + ' - ' + title);

        if (hide_env) {
            env.$div.hide();
        }

        func(env);
    };

    // Init
    that.run_all = function() {
        avaTest();
        // containerTest();
        tickable_test();

        stave_test();
        stave_view_test();

        beam_test();
        beam_view_test();

        bar_test();
        bar_view_test();

        music_test();
        music_view_test();
    };

    return that;
}());


