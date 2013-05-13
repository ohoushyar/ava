/*
 * Bar View Test
 */
var bar_view_test = function () {
    var module_name = 'Ava.BarView';

    module(module_name);

    var model = {
        renderer_backend: Ava.Constant.RAPHAEL,

        stave: {
            clef: 'treble',
            x: 10,
            y: 0,
            width: 300,
        },

        notes: [
            {keys: ["c/4"], duration: "q"},
            {keys: ["d/4"], duration: "q"},
            {keys: ["b/4"], duration: "qr"},
            {keys: ["c/4", "e/4", "g/4"], duration: "q"},
        ],

        voice: {
            num_beats: 4,
            beat_value: 4,
            resolution: Vex.Flow.RESOLUTION
        },

    };

    var sub_module_name = 'Constructor';
    test( sub_module_name, function() {
        var env = ava_test_helper.init_env();
        env.$div.hide();
        var view;

        ok( (function(){
                // Clone model
                var mod = Object.create(model);
                mod.stave.ctx = Vex.Flow.Renderer.buildContext(env.canvas_id, Vex.Flow.Renderer.Backends.RAPHAEL, 500, 120);
                view = new Ava.BarView({ model: mod });
                return view;
            })(), 'Ava.BarView init sucessfully');

        // TODO: use qunit throws instead
        // try {
        //     // Clone model
        //     var mod = Object.create(model);
        //     view = new Ava.BarView({ model: mod });
        //     view.render();
        // }
        // catch(e) {
        //     equal(e.message, 'Invalid context (ctx)', 'Throws exception on invalid ctx');
        // }

    });

    // Methods
    sub_module_name = 'Methods';
    test(sub_module_name, function() {

        var test_title = 'Successfully ran render';

        ava_test_helper.run_view_test( module_name, sub_module_name, test_title, function(env) {

            var mod = Object.create(model);
            mod.stave.ctx = env.ctx;

            var view = new Ava.BarView({ model: mod });
            ok( (function(){
                    view.render();
                    return view.$el;
                })(), test_title);
        });

    //     test_title = 'Successfully ran render with different width';
    //     ava_test_helper.run_view_test( module_name, sub_module_name, test_title, function(env) {

    //         var mod = Object.create(model);
    //         env.ctx.resize(700);
    //         mod.width = 600;
    //         mod.ctx = env.ctx;

    //         var view = new Ava.BarView({ model: mod });
    //         ok( (function(){
    //                 view.render();
    //                 return view.$el;
    //             })(), test_title);
    //     });

    //     test_title = 'Successfully ran render bar with clef';
    //     ava_test_helper.run_view_test( module_name, sub_module_name, test_title, function(env) {

    //         var mod = Object.create(model);
    //         mod.clef = 'bass';
    //         mod.ctx = env.ctx;

    //         var view = new Ava.BarView({ model: mod });
    //         ok( (function(){
    //                 view.render();
    //                 return view.$el;
    //             })(), test_title);
    //     });

    //     test_title = 'Successfully ran render bar with clef, time_signature and key_signature';
    //     ava_test_helper.run_view_test( module_name, sub_module_name, test_title, function(env) {

    //         var mod = Object.create(model);
    //         mod.clef = 'treble';
    //         mod.time_signature = '6/8';
    //         mod.key_signature = 'B';
    //         mod.ctx = env.ctx;

    //         var view = new Ava.BarView({ model: mod });
    //         ok( (function(){
    //                 view.render();
    //                 return view.$el;
    //             })(), test_title);
    //     });

    });

};
