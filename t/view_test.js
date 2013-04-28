/*
 * View Test
 */
var view_test = function () {

    module('Ava.View');

    test( 'Ava.View Init', function() {
        var env = avaTestHelper.init_env();
        var ava_view;

        ok( (function(){
                ava_view = new AvaView({el: env.$div});
                return ava_view;
            })(), 'Ava.View init sucessfully');
        ok( (function(){
                ava_view.render();
                return ava_view.$el;
            })(), 'Render ran successfully');
    });

};

