/*
 * Cursor Test
 */
cursor_test = function () {

    module('Cursor Model');

    test( 'Constructor', function() {
        var cursor;
        var env = ava_test_helper.init_env();
        env.$div.hide();

        cursor = Ava.Cursor({});
        ok( cursor, 'Cursor has been initiated successfully');

        // Test defaults
        equal(cursor.get('x'),       0,                                   'Got expected default value of x');
        equal(cursor.get('y'),       0,                                   'Got expected default value of y');
        equal(cursor.get('width'),   Ava.Constant.CURSOR_DEFAULT_WIDTH,   'Got expected default value of width');
        equal(cursor.get('height'),  Ava.Constant.CURSOR_DEFAULT_HEIGHT,  'Got expected default value of height');
        equal(cursor.get('hide'),  false,  'Got expected default value of hide');

        cursor = Ava.Cursor({
            x:       15,
            y:       16,
            width:   17,
            height:  18,
            hide:    true,
        });
        ok( cursor, 'Cursor initialized successfully with more notes');

    });

    test( 'Methods', function() {
        var cursor;
        var env = ava_test_helper.init_env();
        env.$div.hide();

        cursor = Ava.Cursor({});

        // move
        ok( (function() { cursor.move(10, 11); return true; })(), 'Successfully ran move');
        equal(cursor.get('x'),  10,  'Got expected value of x');
        equal(cursor.get('y'),  11,  'Got expected value of y');

        // resize
        ok( (function() { cursor.resize(10, 11); return true; })(), 'Successfully ran resize');
        equal(cursor.get('width'),  10,  'Got expected value of width');
        equal(cursor.get('height'),  11,  'Got expected value of height');

        // hide
        ok( (function() { cursor.hide(); return true; })(), 'Successfully ran hide');
        equal(cursor.get('hide'),  true,  'Got expected value of hide');

        // show
        ok( (function() { cursor.show(); return true; })(), 'Successfully ran show');
        equal(cursor.get('hide'),  false,  'Got expected value of hide');

    });

};

