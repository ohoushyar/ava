/*
 * Ava View Test
 */
var ava_view_test = function () {
    var module_name = 'Ava.View';

    module(module_name);

    var music_model = {
        title:     'test title',
        subtitle:  'subtitle test',
        composer:  'A composer',
        bars: [{
            clef:                 'treble',
            show_clef:            true,
            key_signature:        'G',
            show_time_signature:  true,
            notes: [
                { keys: ["d/4"], duration: "q" },
                { keys: ["b/4"], duration: "qr" },
                { keys: ["c/4"], duration: "q" },
                { keys: ["d/4"], duration: "q" },
            ],
        }],
    };

    var model = {
        music: music_model,
    };

    var sub_module_name = 'Constructor';
    test( sub_module_name, function() {

        var env = ava_test_helper.get_unittest_div_and_title();
        env.$div.hide();

        ok( (function(){
                return Ava.View({
                    div_id: env.div_id,
                });
            })(), 'Successfully init Ava.View' );

    });

    // Methods
    sub_module_name = 'Methods';
    test(sub_module_name, function() {

        var test_title = 'Successfully ran render';

        var env = ava_test_helper.get_unittest_div_and_title();
        env.$div.width(1024);
        env.$title.html(module_name + ' - ' + sub_module_name + ' - ' + test_title);
        var view = Ava.View({
            div_id: env.div_id,
            model: model,
        });
        ok( (function(){
                return view.render();
            })(), test_title);

    });

};

