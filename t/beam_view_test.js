
/*
 * Beam View Test
 */
var beam_view_test = function () {
    var module_name = 'Ava.BeamView';

    var init = function(spec) {
        var stave = Ava.StaveView({
            model: Ava.Stave({
                x: 0,
                y: 0,
                width: 300,
            }),
        });
        var notes = spec.notes.map( function(note) {
                return new Vex.Flow.StaveNote({
                    keys: note.get('keys'),
                    duration: note.get('duration'),
                });
            });
        var voice = new Vex.Flow.Voice({
            num_beats: 4,
            beat_value: 4,
            resolution: Vex.Flow.RESOLUTION
        });

        // Add notes to voice
        voice.addTickables(notes);

        var vex_stave = stave.render().vex_stave;
        var formatter = new Vex.Flow.Formatter()
            .joinVoices([voice])
            .formatToStave([voice], vex_stave);

        return {
            notes: notes,
            voice: voice,
            vex_stave: vex_stave,
        };
    };

    // Tests
    module(module_name);

    var model = {
        notes: new Ava.TickableList([
            { keys: ["f/4"], duration: "16"},
            { keys: ["e/4"], duration: "8"},
            { keys: ["d/4"], duration: "16"},
            { keys: ["c/4"], duration: "16"},

            { keys: ["d/4"], duration: "8"},
            { keys: ["f/4"], duration: "16"},
            { keys: ["f/4"], duration: "16"},
            { keys: ["e/4"], duration: "8"},

            { keys: ["d/4"], duration: "16"},
            { keys: ["c/4"], duration: "16"},
            { keys: ["d/4"], duration: "8"},
            { keys: ["f/4"], duration: "16"},
        ]),
    };

    var sub_module_name = 'Constructor';
    test( sub_module_name, function() {
        var env = ava_test_helper.init_env();
        env.$div.hide();
        var mod = _.clone(model);
        var mod_result = init(mod);

        var view;
        ok( (function() {
                view = Ava.BeamView( { model: new Backbone.Model(mod_result) } );
                return view;
            })(), 'Successfully initial a BeamView object');

        try {
            view = Ava.BeamView({
                model: new Backbone.Model({notes: "not_array notes"}),
            });
        }
        catch(err) {
            equal(err.message, 'Invalid notes. It has to be an Array and has to have more than one element', 'Expected to throw exception on non-array notes');
        }

    });

    // Methods
    sub_module_name = 'Methods';
    test(sub_module_name, function() {

        var test_title = 'Successfully ran render';
        ava_test_helper.run_view_test( module_name, sub_module_name, test_title, function(env) {

            var mod = _.clone(model);
            var mod_result = init(mod);

            var view = Ava.BeamView( { model: new Backbone.Model({
                        notes: mod_result.notes.slice(0, 8),
                    }) } );
            // Voice draw has to happen after instantiation of BeamView
            mod_result.voice.draw(mod_result.ctx, mod_result.vex_stave);

            // Then after voice draw run BeamView render otherwise it
            // won't render properly. This is how VexFlow works.
            ok( (function(){
                    view.render();
                    return view.$el;
                })(), test_title);
        });

        test_title = 'Successfully ran render with different position of beam';
        ava_test_helper.run_view_test( module_name, sub_module_name, test_title, function(env) {

            var mod = _.clone(model);
            mod.ctx = env.ctx;
            var mod_result = init(mod);

            var beam_views = [
                Ava.BeamView({
                    model: new Backbone.Model({
                        notes: mod_result.notes.slice(0, 4),
                        ctx: mod_result.ctx,
                    })
                }),
                Ava.BeamView({
                    model: new Backbone.Model({
                        notes: mod_result.notes.slice(8, 12),
                        ctx: mod_result.ctx,
                    })
                })
            ];
            // Voice draw has to happen after instantiation of BeamView
            mod_result.voice.draw(mod_result.ctx, mod_result.vex_stave);

            // Then after voice draw run BeamView render otherwise it
            // won't render properly. This is how VexFlow works.
            ok( (function(){
                    _.each(beam_views, function(view) {
                        view.render();
                    });
                    return true;
                })(), test_title);
        });

        test_title = 'Successfully ran render with different position of beams';
        ava_test_helper.run_view_test( module_name, sub_module_name, test_title, function(env) {

            var mod = _.clone(model);
            mod.ctx = env.ctx;
            var mod_result = init(mod);

            var beam_views = [
                Ava.BeamView({
                    model: new Backbone.Model({
                        notes: mod_result.notes.slice(0, 2),
                        ctx: mod_result.ctx,
                    })
                }),
                Ava.BeamView({
                    model: new Backbone.Model({
                        notes: mod_result.notes.slice(2, 4),
                        ctx: mod_result.ctx,
                    })
                }),
                Ava.BeamView({
                    model: new Backbone.Model({
                        notes: mod_result.notes.slice(8, 12),
                        ctx: mod_result.ctx,
                    })
                })
            ];
            // Voice draw has to happen after instantiation of BeamView
            mod_result.voice.draw(mod_result.ctx, mod_result.vex_stave);

            // Then after voice draw run BeamView render otherwise it
            // won't render properly. This is how VexFlow works.
            ok( (function(){
                    _.each(beam_views, function(view) {
                        view.render();
                    });
                    return true;
                })(), test_title);
        });

        test_title = 'Successfully ran render with automatic beams';
        ava_test_helper.run_view_test( module_name, sub_module_name, test_title, function(env) {

            var mod = {
                notes: new Ava.TickableList([

                    { keys: ["f/4"], duration: "16"},
                    { keys: ["e/4"], duration: "8"},
                    { keys: ["d/4"], duration: "16"},
                    { keys: ["c/4"], duration: "16"},

                    { keys: ["d/4"], duration: "16"},
                    { keys: ["c/4"], duration: "16"},
                    { keys: ["d/4"], duration: "8"},
                    { keys: ["f/4"], duration: "16"},

                    { keys: ["d/4"], duration: "8"},
                    { keys: ["d/4"], duration: "q"},

                ]),
            };

            mod.ctx = env.ctx;
            var mod_result = init(mod);

            var beam_views = [
                Ava.BeamView({
                    model: new Backbone.Model({
                        notes: mod_result.notes,
                        ctx: mod_result.ctx,
                    })
                }),
            ];
            // Voice draw has to happen after instantiation of BeamView
            mod_result.voice.draw(mod_result.ctx, mod_result.vex_stave);

            // Then after voice draw run BeamView render otherwise it
            // won't render properly. This is how VexFlow works.
            ok( (function(){
                    _.each(beam_views, function(view) {
                        view.render();
                    });
                    return true;
                })(), test_title);
        });
    });

};

