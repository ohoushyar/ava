/*
 * Ava Test
 */
avaTest = function () {
    module('Ava');

    test( 'Constructor', function() {
            equal( typeof Ava, 'object', 'Successfully initialized');
            equal( typeof Ava.Context, 'object', 'Successfully initialized');
    });

    test( 'Context', function() {
            equal( Ava.Context.current_duration(), Ava.Constant.DEFAULT_DURATION, 'Ava constructed successfully');
            // current_duration
            ok ( Ava.Context.current_duration(2), 'Successfully set the value of current duration');
            equal( Ava.Context.current_duration(), 2, 'Got expected value of current duration');
            throws( function() {
                    Ava.Context.current_duration('q');
                }, "Throws exception on invalid duration [2]");
            throws( function() {
                    Ava.Context.current_duration('a');
                }, "Throws exception on invalid duration [a]");
            equal( Ava.Context.cd(), Ava.Context.current_duration(), 'Alias "cd" set successfully to "current_duration"');


            // current clef
            throws(
                function() {
                    Ava.Context.current_clef('treeeble');
                },
                'Throws exception on invalid clef'
            );
            equal( Ava.Context.current_clef(), Ava.Constant.DEFAULT_CLEF, 'Got expected value of default clef' );
            ok( Ava.Context.current_clef('bass'), 'Successfully set current value of clef' );
            equal( Ava.Context.current_clef(), 'bass', 'Got expected value of current clef after set' );
            equal( Ava.Context.cc(), Ava.Context.current_clef(), 'Alias "cc" set successfully to "current_clef"');

            // current key_sig
            throws(
                function() {
                    Ava.Context.current_key_sig('invalid');
                },
                'Throws exception on invalid key_sig'
            );
            equal( Ava.Context.current_key_sig(), Ava.Constant.DEFAULT_KEY_SIG, 'Got expected value of default key signature' );
            ok( Ava.Context.current_key_sig('G'), 'Successfully set current value of key signature' );
            equal( Ava.Context.current_key_sig(), 'G', 'Got expected value of current key signature after set' );
            equal( Ava.Context.ck(), Ava.Context.current_key_sig(), 'Alias "ck" set successfully to "current_key_sig"');

            // current time_sig
            throws(
                function() {
                    Ava.Context.current_time_sig('invalid');
                },
                'Throws exception on invalid time_sig'
            );
            equal( Ava.Context.current_time_sig(), Ava.Constant.DEFAULT_TIME_SIG, 'Got expected value of default time signature' );
            ok( Ava.Context.current_time_sig('6/8'), 'Successfully set current value of time signature' );
            equal( Ava.Context.current_time_sig(), '6/8', 'Got expected value of current time signature after set' );
            equal( Ava.Context.ct(), Ava.Context.current_time_sig(), 'Alias "ct" set successfully to "current_time_sig"');

            // current_div_id
            throws(
                function() {
                    Ava.Context.current_div_id('test');
                },
                'Throws exception on invalid DOM object'
            );
            throws(
                function() {
                    Ava.Context.current_div_id(123);
                },
                'Throws exception on invalid div'
            );
            ok( $('body').append('<div id="test"></div>'), 'added test div successfully');
            equal( Ava.Context.current_div_id('test'), 'test', 'Successfully get the value of div_id' );
            equal( Ava.Context.current_div_id(), 'test', 'Successfully get the value of div_id' );

            // vexflow_ctx
            throws(
                function() {
                    Ava.Context.vexflow_ctx(123);
                },
                'Throws exception on invalid ctx'
            );
            ok( $('#test').detach(), 'detached the test div successfully');
            throws(
                function() {
                    Ava.Context.vexflow_ctx();
                },
                'Throws exception on invalid dom object to build ctx'
            );
            ok( $('body').append('<div id="test"></div>'), 'added test div successfully');
            equal( typeof Ava.Context.vexflow_ctx(), 'object', 'Successfully got the expected object');
            ok( Ava.Context.vexflow_ctx( Vex.Flow.Renderer.buildContext( 'test', Vex.Flow.Renderer.Backends.RAPHAEL, 200, 200) ), 'Successfully set vexflow_ctx');

            // clean-up
            ok( $('#test').detach(), 'detached the test div successfully');
        });
};
