/*
 * Cursor View Test
 */
var cursor_view_test = function () {
    var module_name = 'Ava.CursorView';

    module(module_name);

    var sub_module_name = 'Constructor';
    test( sub_module_name, function() {
        var env = ava_test_helper.init_env();
        env.$div.hide();

        ok( (function(){
            // Clone model
            var mod = Ava.Cursor({});
            var view = Ava.CursorView({ model: mod });
            return view;
        })(), 'Ava.CursorView init sucessfully');

    });

    // Methods
    sub_module_name = 'Methods';
    test(sub_module_name, function() {

        var test_title = 'Successfully ran render';

        ava_test_helper.run_view_test( module_name, sub_module_name, test_title, function(env) {

            var mod = Ava.Cursor({});

            var view = Ava.CursorView({ model: mod });
            ok( (function(){
                    view.render();
                    return view.$el;
                })(), test_title);
        });

        test_title = "Successfully moved to new coordinates";
        ava_test_helper.run_view_test( module_name, sub_module_name, test_title, function(env) {

            var mod = Ava.Cursor({});

            var view = Ava.CursorView({ model: mod });
            view.render();

            ok( (function(){
                    view.move(30, 0);
                    return true;
                })(), test_title);
        });

        test_title = "Successfully moved multiple times";
        ava_test_helper.run_view_test( module_name, sub_module_name, test_title, function(env) {

            var mod = Ava.Cursor({});

            var view = Ava.CursorView({ model: mod });
            view.render();
            view.move(30, 0);

            ok( (function(){
                    view.move(50, 0);
                    return true;
                })(), test_title);
        });

        test_title = "Successfully resized";
        ava_test_helper.run_view_test( module_name, sub_module_name, test_title, function(env) {

            var mod = Ava.Cursor({});

            var view = Ava.CursorView({ model: mod });
            view.render();

            ok( (function(){
                    view.resize(10, 10);
                    return true;
                })(), test_title);
        });

        test_title = "Successfully resized and moved";
        ava_test_helper.run_view_test( module_name, sub_module_name, test_title, function(env) {

            var mod = Ava.Cursor({});

            var view = Ava.CursorView({ model: mod });
            view.render();

            ok( (function(){
                    view.resize_and_move(10, 10, 30, 30);
                    return true;
                })(), test_title);
        });
    });

};

