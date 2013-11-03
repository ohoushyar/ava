/*
 * Toolbar View Test
 */
var toolbar_view_test = function () {
    var module_name = 'Ava.ToolbarView';

    module(module_name);

    var sub_module_name = 'Constructor';
    test( sub_module_name, function() {
        var env = ava_test_helper.init_env();
        env.$div.hide();

        ok( (function(){
            var view = Ava.ToolbarView();
            return view;
        })(), 'Ava.ToolbarView init sucessfully');
    });

    // Methods
    sub_module_name = 'Methods';
    test(sub_module_name, function() {

        var test_title = 'Successfully ran render';
        var env = ava_test_helper.get_unittest_div_and_title();
        env.$title.html(module_name + ' - ' + sub_module_name + ' - ' + test_title);
        //var view = Ava.ToolbarView({id: env.div_id});
        var view = Ava.ToolbarView({el: env.$div});
        ok( (function(){
                view.render();
                return view.$el.length;
            })(), test_title);
        ok( $('#' + env.div_id + ' > nav').length, 'found nav element' );
    });

};

