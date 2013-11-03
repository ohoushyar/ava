/*
 * Leftnav View Test
 */
var leftnav_view_test = function () {
    var module_name = 'Ava.LeftnavView';

    module(module_name);

    var sub_module_name = 'Constructor';
    test( sub_module_name, function() {
        var env = ava_test_helper.init_env();
        env.$div.hide();

        ok( (function(){
            var view = Ava.LeftnavView();
            return view;
        })(), 'Ava.LeftnavView init sucessfully');
    });

    // Methods
    sub_module_name = 'Methods';
    test(sub_module_name, function() {

        var test_title = 'Successfully ran render';
        var env = ava_test_helper.get_unittest_div_and_title();
        env.$div.addClass('clearfix');
        env.$title.html(module_name + ' - ' + sub_module_name + ' - ' + test_title);

        var view = Ava.LeftnavView({el: env.$div});
        ok( (function(){
                view.render();
                return view.$el.length;
            })(), test_title);
        var $leftnav_container = $('#left-nav-container');
        ok( $leftnav_container.length, 'found nav element' );
    });

};

