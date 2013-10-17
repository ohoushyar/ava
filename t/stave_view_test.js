/*
 * Stave View Test
 */
var stave_view_test = function () {
    var module_name = 'Ava.StaveView';

    module(module_name);

    var model = {
        x: 10,
        y: 0,
        width: 250,
    };

    var sub_module_name = 'Constructor';
    test( sub_module_name, function() {
        var env = ava_test_helper.init_env();
        env.$div.hide();
        var view;

        ok( (function(){
                var mod = Ava.Stave(model);
                view = Ava.StaveView({ model: mod });
                return view;
            })(), 'Ava.StaveView init sucessfully');

    });

    // Methods
    sub_module_name = 'Methods';
    test(sub_module_name, function() {

        var test_title = 'Successfully ran render';

        ava_test_helper.run_view_test( module_name, sub_module_name, test_title, function(env) {

            var mod = Ava.Stave(model);
            var view = Ava.StaveView({ model: mod });
            ok( (function(){
                    view.render();
                    return true;
                })(), test_title);
        });

        test_title = 'Successfully ran render with different width';
        ava_test_helper.run_view_test( module_name, sub_module_name, test_title, function(env) {

            var mod = Ava.Stave(model);
            mod.set('width', 600);

            var view = Ava.StaveView({ model: mod });
            ok( (function(){
                    view.render();
                    return view.$el;
                })(), test_title);
        });

        test_title = 'Successfully ran render stave with clef';
        ava_test_helper.run_view_test( module_name, sub_module_name, test_title, function(env) {

            var mod = Ava.Stave(model);
            mod.set('clef', 'bass');

            var view = Ava.StaveView({ model: mod });
            ok( (function(){
                    view.render();
                    return view.$el;
                })(), test_title);
        });

        test_title = 'Successfully ran render stave with clef, time_signature and key_signature';
        ava_test_helper.run_view_test( module_name, sub_module_name, test_title, function(env) {

            var mod = Ava.Stave(model);
            mod.set('clef', 'treble');
            mod.set('time_signature', '6/8');
            mod.set('key_signature', 'B');

            var view = Ava.StaveView({ model: mod });
            ok( (function(){
                    view.render();
                    return view.$el;
                })(), test_title);
        });

        // Test with normal model
        env = ava_test_helper.init_env();
        env.$div.hide();
        mod = Ava.Stave(model);
        view = Ava.StaveView({ model: mod });

        throws( function() {
                    view.get_y_hot_spot(22);
                }, "Exception has been thrown before running render");

        view.render();

        var y = view.vex_stave.y + 22;
        equal( view.get_y_hot_spot(y), 20, "Got expected value from get_y_hot_spot" );
        y += 0.5;
        equal( view.get_y_hot_spot(y), 20, "Got expected value from get_y_hot_spot on hot boundry" );

        // Move model down for 2px
        var model2 = _.clone(model);
        model2.y += 2;
        env = ava_test_helper.init_env();
        env.$div.hide();
        mod = Ava.Stave(model2);
        view = Ava.StaveView({ model: mod });
        view.render();

        y = view.vex_stave.y + 22;
        equal( view.get_y_hot_spot(y), 22, "Got expected value from get_y_hot_spot" );

        y = view.vex_stave.y + 45;
        equal( view.get_y_hot_spot(y), 47, "Got expected value from get_y_hot_spot" );
        equal( view.get_line_of(y), 0.5, "Got the line correspond to y");
        equal( view.get_line_of(68), 2.5, "Got the line correspond to y");


    });

};

