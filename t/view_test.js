/*
 * View Test
 */
var view_test = function () {

    module('Ava.View');

    var model = {
        renderer_backend: Ava.Constant.RAPHAEL,

        stave: {x: 10, y: 0, width: 500},
        clef: 'treble',

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

    test( 'Ava.View Init', function() {
        var env = avaTestHelper.init_env();
        var ava_view;

        ok( (function(){
                ava_view = new AvaView({canvas_id: env.canvas_id, el: env.$div, model: model});
                return ava_view;
            })(), 'Ava.View init sucessfully');
        ok( (function(){
                ava_view.render();
                return ava_view.$el;
            })(), 'Render ran successfully');
    });


};

