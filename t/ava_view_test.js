/*
 * Ava View Test
 */
var ava_view_test = function () {
    var module_name = 'Ava.View';

    module(module_name);

    var model = {
        canvas_class_name: 'ut-canvas',
    };

    var sub_module_name = 'Constructor';
    test( sub_module_name, function() {

        var env = ava_test_helper.get_unittest_div_and_title();
        env.$div.hide();

        ok( (function(){
                return new Ava.View({
                    el: env.div_id,
                });
            })(), 'Successfully init Ava.View' );

    });

    // Methods
    sub_module_name = 'Methods';
    test(sub_module_name, function() {

        var test_title = 'Successfully ran render';

        var env = ava_test_helper.get_unittest_div_and_title();
        env.$title.html(module_name + ' - ' + sub_module_name + ' - ' + test_title);
        var view = new Ava.View({
            el: env.$div,
            model: model,
        });
        ok( (function(){
                return view.render();
            })(), test_title);

    });

};

