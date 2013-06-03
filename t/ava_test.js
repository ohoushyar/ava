/*
 * Ava Test
 */
avaTest = function () {
    module('Ava');

    test( 'Constructor', function() {
            equal( Ava.Context.current_duration(), 'w', 'Ava constructed successfully');
            });

    test( 'Context', function() {
            // current_duration
            equal( Ava.Context.current_duration('q'), 'q', 'current_duration returns the value has been passed');
            equal( Ava.Context.current_duration(), 'q', 'current_duration returns the value has been set');
            throws( function() {
                    Ava.Context.current_duration(2);
                }, "Throws exception on invalid duration [2]");

            throws( function() {
                    Ava.Context.current_duration('a');
                }, "Throws exception on invalid duration [a]");

            // vexflow_ctx_div_id
            throws(
                function() {
                    Ava.Context.vexflow_ctx_div_id('test');
                },
                'Throws exception on invalid DOM object'
            );
            throws(
                function() {
                    Ava.Context.vexflow_ctx_div_id(123);
                },
                'Throws exception on invalid div'
            );
            ok( $('body').append('<div id="test"></div>'), 'added test div successfully');
            equal( Ava.Context.vexflow_ctx_div_id('test'), 'test', 'Successfully get the value of div_id' );
            equal( Ava.Context.vexflow_ctx_div_id(), 'test', 'Successfully get the value of div_id' );

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

        });
};
