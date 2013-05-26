/*
 * Bar Test
 */
bar_test = function () {

    module('Bar Model');

    test( 'Constructor', function() {
                var bar;
                var env = ava_test_helper.init_env();
                env.$div.hide();

                bar = Ava.Bar({
                        notes: [
                            { keys: ["d/5"], duration: "wr" },
                        ],
                    });
                ok( bar, 'Bar has been initiated successfully');

                // Test defaults
                equal(typeof bar.get('stave'), 'object', 'stave is an object');
                ok(bar.get('stave').has('x'), 'stave has attribute x');
                ok(bar.get('stave').has('y'), 'stave has attribute y');
                ok(bar.get('stave').has('width'), 'stave has attribute width');
                equal(bar.get('show_clef'), false, 'Got expected default value of show_clef');
                equal(bar.get('num_beat'), 4, 'Got expected default value of num_beat');
                equal(bar.get('beat_value'), 4, 'Got expected default value of beat_value');
                equal(bar.get('show_time_signature'), false, 'Got expected default value of show_time_signature');

                bar = Ava.Bar({
                        clef: 'treble',
                        show_clef: true,
                        key_signature: 'G',
                        show_time_signature: true,
                        notes: [
                            { keys: ["d/4"], duration: "q" },
                            { keys: ["b/4"], duration: "qr" },
                            { keys: ["c/4"], duration: "q" },
                            { keys: ["d/4"], duration: "q" },
                        ],
                    });
                ok( bar, 'Bar initialized successfully with more notes');

                bar = Ava.Bar({
                        clef: 'treble',
                        show_clef: true,
                        key_signature: 'G',
                        show_time_signature: true,
                        notes: [
                            { keys: ["d/4"], duration: "q" , beam: "beam1" },
                            { keys: ["b/4"], duration: "qr" , beam: "beam1" },
                            { keys: ["c/4"], duration: "q" , beam: "beam1" },
                            { keys: ["d/4"], duration: "q" , beam: "beam1" },
                        ],
                    });
                ok( bar, 'Bar initialized successfully with notes include beam');

                var bar_list = new Ava.BarList([
                    { notes: [ { keys: ["d/5"], duration: "wr" } ] },
                    { notes: [ { keys: ["d/5"], duration: "wr" } ] },
                    { notes: [ { keys: ["d/5"], duration: "wr" } ] },
                ]);

                ok( bar_list, 'Initialized a list of bars');
                equal( bar_list.length, 3, 'got expected number of bars');
                ok( (function() {return bar_list.first().cid;})(), 'successfully got cid attribute of first bar' );

            });

    test( 'Methods', function() {
                var bar;
                var env = ava_test_helper.init_env();
                env.$div.hide();

                bar = Ava.Bar({
                        clef: 'treble',
                        show_clef: true,
                        key_signature: 'G',
                        num_beat: 3,
                        beat_value: 4,
                        show_time_signature: true,
                        notes: [
                            { keys: ["d/4"], duration: "h" },
                        ],
                    });

                equal( bar.get('notes').length, 1, 'Expect only one note' );
                ok( (function() { bar.add_note( Ava.Tickable({ keys: ["d/4"], duration: "q" })); return true; }()), 'Successfully added a tickable to bar');
                equal( bar.get('notes').length, 2, 'Successfully added another tickable' );


                bar = Ava.Bar({
                    notes: [
                        { keys: ["d/5"], duration: "wr" },
                    ],
                });

                throws(
                    function() {
                        bar.add_note();
                    },
                    'expected to throw exception on invalidParam'
                );

             });

};

