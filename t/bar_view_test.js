/*
 * Bar View Test
 */
var bar_view_test = function () {
    var module_name = 'Ava.BarView';

    module(module_name);

    var notes1 = [
        {keys: ["c/4"], duration: "q"},
        {keys: ["d/4"], duration: "q"},
        {keys: ["b/4"], duration: "qr"},
        {keys: ["c/4", "e/4", "g/4"], duration: "q"},
    ];

    var notes2 = [
        { keys: ["f/5"], beam: "beam1", duration: "8"},
        { keys: ["d/5"], beam: "beam1", duration: "16"},
        { keys: ["c/5"], beam: "beam1", duration: "16"},
        { keys: ["c/5"], beam: "beam1", duration: "16"},

        { keys: ["d/5"], beam: "beam2", duration: "16"},
        { keys: ["e/5"], beam: "beam2", duration: "8"},
        { keys: ["f/5"], beam: "beam2", duration: "8"},
        { keys: ["d/5"], beam: "beam2", duration: "16"},

        { keys: ["c/5"], stem_direction: 1, duration: "16"},
        { keys: ["c/5"], stem_direction: 1, duration: "16"},
        { keys: ["d/5"], stem_direction: 1, duration: "16"},
        { keys: ["e/5"], stem_direction: 1, duration: "8"},
    ];

    var model = {
        renderer_backend: Ava.Constant.RAPHAEL,

        clef: 'treble',
        show_clef: true,
        key_signature: 'G',
        show_time_signature: true,
        show_key_signature: true,

        notes: notes1,
    };

    var sub_module_name = 'Constructor';
    test( sub_module_name, function() {
        var env = ava_test_helper.init_env();
        env.$div.hide();

        ok( (function(){
            // Clone model
            var mod = Ava.Bar(model);
            var view = Ava.BarView({ model: mod });
            return view;
        })(), 'Ava.BarView init sucessfully');

        ok( (function(){
            // Clone model
            var new_model = _.clone(model);
            new_model.notes = notes2;
            var mod = Ava.Bar(new_model);
            var view = Ava.BarView({ model: mod });
            return view;
        })(), 'Ava.BarView init sucessfully with notes and different beams');

        // TODO: use qunit throws instead
        // try {
        //     // Clone model
        //     var mod = Object.create(model);
        //     view = Ava.BarView({ model: mod });
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

            var mod = Ava.Bar(model);

            var view = Ava.BarView({ model: mod });
            ok( (function(){
                    view.render();
                    return view.$el;
                })(), test_title);
        });

        test_title = 'Successfully render the bar without notes';
        ava_test_helper.run_view_test( module_name, sub_module_name, test_title, function(env) {

            var empty_model = _.clone(model);
            empty_model.notes = [ ];

            var mod = Ava.Bar(empty_model);

            var view = Ava.BarView({ model: mod });
            ok( (function(){
                    view.render();
                    return view.$el;
                })(), test_title);
        });

        test_title = 'Successfully ran render the bar includes notes with beam';
        ava_test_helper.run_view_test( module_name, sub_module_name, test_title, function(env) {

            var new_model = _.clone(model);
            new_model.notes = notes2;
            var mod = Ava.Bar(new_model);

            var view = Ava.BarView({ model: mod });
            ok( (function(){
                    view.render();
                    return view.$el;
                })(), test_title);
        });

        test_title = 'Successfully ran bar render with insufficient note. Expect to fill with rests';
        ava_test_helper.run_view_test( module_name, sub_module_name, test_title, function(env) {

            var new_model = _.clone(model);
            // only one quarter
            new_model.notes = [
                {keys: ["c/4"], duration: "q"},
            ];
            var mod = Ava.Bar(new_model);

            var view = Ava.BarView({ model: mod });
            ok( (function(){
                    view.render();
                    return true;
                })(), test_title);
        });

        test_title = 'Successfully trigger render on model change';
        ava_test_helper.run_view_test( module_name, sub_module_name, test_title, function(env) {

            var new_model = _.clone(model);
            // only one quarter
            new_model.notes = [
                {keys: ["c/4"], duration: "q"},
            ];
            var mod = Ava.Bar(new_model);

            var view = Ava.BarView({ model: mod });
            view.render();

            ok( (function(){
                // Trigger a change on model
                // This suppose to run render of view again
                view.add_note( { keys: ["d/4"], duration: "q" } );
                return true;
            })(), test_title);
        });

    //     test_title = 'Successfully ran render with different width';
    //     ava_test_helper.run_view_test( module_name, sub_module_name, test_title, function(env) {

    //         var mod = Object.create(model);
    //         env.ctx.resize(700);
    //         mod.width = 600;
    //         mod.ctx = env.ctx;

    //         var view = Ava.BarView({ model: mod });
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

    //         var view = Ava.BarView({ model: mod });
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

    //         var view = Ava.BarView({ model: mod });
    //         ok( (function(){
    //                 view.render();
    //                 return view.$el;
    //             })(), test_title);
    //     });

    });

};

