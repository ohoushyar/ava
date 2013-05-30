/*
 * Ava.Music
 *
 * Container of all music property
 *
 * Title
 * Subtitle
 * Composer
 *
 * Clef
 * Key Signature
 * Time Signature
 * Bars: Ava.BarList
 * Stave
 *
 */
Ava.MusicModel = Backbone.Model.extend({

    defaults: function() {
        return {
            title: 'untitle',
            subtitle: 'no-subtitle',
            composer: 'unknown',
            clef: 'treble',
            key_signature: 'C',
            time_signature: '4/4',
            num_beat: 4,
            beat_value: 4,
        };
    },

    initialize: function() {
        if (typeof this.get('bars') === 'object') {
            this.set( 'bars', new Ava.BarList(this.get('bars')) );
        }
    },

});

Ava.Music = function (spec) {
    var that = new Ava.MusicModel(spec);
    return that;
}
