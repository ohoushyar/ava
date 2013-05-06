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
                // Clone model
                var mod = Object.create(model);
                mod.ctx = Vex.Flow.Renderer.buildContext(env.canvas_id, Vex.Flow.Renderer.Backends.RAPHAEL, 500, 120);
                view = new Ava.StaveView({ model: mod });
                return view;
            })(), 'Ava.StaveView init sucessfully');

        // TODO: use qunit throws instead
        try {
            var mod = Object.create(model);
            view = new Ava.StaveView({ model: mod });
            view.render();
        }
        catch(e) {
            equal(e.message, 'Invalid context (ctx)', 'Throws exception on invalid ctx');
        }

    });

    sub_module_name = 'Methods';
    test(sub_module_name, function() {
        var env = ava_test_helper.init_env();
        model.ctx = Vex.Flow.Renderer.buildContext(env.canvas_id, Vex.Flow.Renderer.Backends.RAPHAEL, 500, 120);

        var test_title = 'Successfully ran render';
        env.$title.html(module_name + ' - ' + sub_module_name + ' - ' + test_title);
        var view = new Ava.StaveView({ model: model });
        ok( (function(){
                view.render();
                return view.$el;
            })(), test_title);
    });

};

