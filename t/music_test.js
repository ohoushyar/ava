/*
 * Music Test
 */
music_test = function () {

    module('Music Model');

    test( 'Constructor', function() {
                var music;
                var env = ava_test_helper.init_env();
                env.$div.hide();

                music = Ava.Music({
                    });
                ok( music, 'Music has been initiated successfully');

                // Test defaults
                equal(music.get('title'), 'untitle', 'Got expected default value of title');
                equal(music.get('subtitle'), 'no-subtitle', 'Got expected default value of subtitle');
                equal(music.get('composer'), 'unknown', 'Got expected default value of composer');
                equal(music.get('clef'), 'treble', 'Got expected default value of clef');
                equal(music.get('key_signature'), 'C', 'Got expected default value of key_signature');
                equal(music.get('time_signature'), '4/4', 'Got expected default value of time_signature');
                equal(music.get('num_beat'), 4, 'Got expected default value of num_beat');
                equal(music.get('beat_value'), 4, 'Got expected default value of beat_value');

                music = Ava.Music({
                    title: 'test title',
                    subtitle: 'subtitle test',
                    composer: 'A composer',
                });
                ok( music, 'Music has been initiated successfully with attributes');

                equal(music.get('title'), 'test title', 'Got expected default value of title');
                equal(music.get('subtitle'), 'subtitle test', 'Got expected default value of subtitle');
                equal(music.get('composer'), 'A composer', 'Got expected default value of composer');

                music = Ava.Music({
                    bars: [{
                        clef: 'treble',
                        show_clef: true,
                        key_signature: 'G',
                        show_time_signature: true,
                        tickables: [
                            { keys: ["d/4"], duration: "q" },
                            { keys: ["b/4"], duration: "qr" },
                            { keys: ["c/4"], duration: "q" },
                            { keys: ["d/4"], duration: "q" },
                        ],
                    }],
                });
                ok( music, 'Music has been initiated successfully with bars');

                equal( music.get('bars').length, 1, 'Got expected number of bars');

            });

    // test( 'Methods', function() {
    //     var bar;
    //     var env = ava_test_helper.init_env();
    //     env.$div.hide();
    // });

};

