/*
 * Music View Test
 */
var music_view_test = function () {
    var module_name = 'Ava.MusicView';

    var model = {
        bars: [
            {
                clef: 'treble',
                show_clef: true,
                key_signature: 'G',
                show_time_signature: true,
                show_key_signature: true,
                notes: [
                    { keys: ["d/4"], duration: "q" },
                    { keys: ["b/4"], duration: "qr" },
                    { keys: ["c/4"], duration: "q" },
                    { keys: ["d/4"], duration: "q" },
                ],
            },
            {
                notes: [
                    { keys: ["d/4"], duration: "q" },
                    { keys: ["c/4"], duration: "q" },
                    { keys: ["b/4"], duration: "qr" },
                    { keys: ["d/4"], duration: "q" },
                ],
            }
        ],
    };

    module(module_name);

    var sub_module_name = 'Constructor';
    test( sub_module_name, function() {
        var env = ava_test_helper.init_env();
        env.$div.hide();
        // Clone model
        var mod = Ava.Music(model);
        mod.set('canvas_id', env.canvas_id);

        ok( (function(){
            var view = Ava.MusicView({ model: mod });
            return view;
        })(), 'Ava.MusicView init sucessfully');

    });

    // Methods
    sub_module_name = 'Methods';
    test(sub_module_name, function() {

        var test_title = 'Successfully ran render';

        ava_test_helper.run_view_test( module_name, sub_module_name, test_title, function(env) {

            var mod = Ava.Music(model);
            mod.set('canvas_id', env.canvas_id);
            //mod.get('stave').set('ctx', env.ctx);

            var view = Ava.MusicView({ model: mod });
            ok( (function(){
                    view.render();
                    return true;
                })(), test_title);
        });

        test_title = 'Successfully triggered render on model change';
        ava_test_helper.run_view_test( module_name, sub_module_name, test_title, function(env) {

            var mod = Ava.Music(model);
            mod.set('canvas_id', env.canvas_id);
            var view = Ava.MusicView({ model: mod });
            view.render();

            ok( (function() {
                    view.add_bar({
                        notes: [
                            { keys: ["d/5"], duration: "wr" },
                        ],
                    });
                    return true;
                })(), test_title);
        });

        test_title = 'Successfully rendered with four bars';
        ava_test_helper.run_view_test( module_name, sub_module_name, test_title, function(env) {

            var new_model = _.clone(model);
            new_model.bars.push( {
                notes: [
                    { keys: ["d/4"], duration: "q" },
                    { keys: ["c/4"], duration: "q" },
                    { keys: ["b/4"], duration: "qr" },
                    { keys: ["d/4"], duration: "q" },
                ],
            } );

            var mod = Ava.Music(new_model);
            mod.set('canvas_id', env.canvas_id);
            var view = Ava.MusicView({ model: mod });
            view.render();

            ok( (function() {
                    view.add_bar({
                        notes: [
                            { keys: ["d/5"], duration: "wr" },
                        ],
                    });
                    return true;
                })(), test_title);

            throws( function() { view.get_bar_view_of(); }       , 'Exception has been thrown on invalid x');
            throws( function() { view.get_bar_view_of( 2000 ); } , 'Exception has been thrown on out of range x');

            equal( view.get_bar_view_of(100).model.get('x'), view.bars[0].model.get('x'), 'Got expected bar view object' );
            equal( view.get_bar_view_of(600).model.get('x'), view.bars[1].model.get('x'), 'Got expected bar view object' );

        });

    });

};

