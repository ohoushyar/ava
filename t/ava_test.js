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
            equal( Ava.Context.current_duration(), 'w', 'Ava constructed successfully');
            // current_duration
            equal( Ava.Context.current_duration('q'), 'q', 'current_duration returns the value has been passed');
            equal( Ava.Context.current_duration(), 'q', 'current_duration returns the value has been set');
            throws( function() {
                    Ava.Context.current_duration(2);
                }, "Throws exception on invalid duration [2]");
            throws( function() {
                    Ava.Context.current_duration('a');
                }, "Throws exception on invalid duration [a]");
            equal( Ava.Context.cd(), Ava.Context.current_duration(), 'Alias "cd" set successfully to "current_duration"');

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

            // current div_id
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
