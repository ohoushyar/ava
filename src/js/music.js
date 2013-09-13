/**
 * Represents Music model
 *
 * @class Ava.Music
 * @extends Backbone.Model
 * @constructor
 * @param {Object} spec Object includes all properties value
 * @return {Object} Returns Music model object
 **/
Ava.Music = function (spec) {
    var that = {};

    ( function(spec) {

        var MusicModel = Backbone.Model.extend({
            defaults: function() {
                return {

                    /**
                     * Music title
                     * @attribute title
                     * @type {String}
                     * @default untitle
                     * @optional
                     **/
                    title: 'untitle',

                    /**
                     * Music sub-title
                     * @attribute subtitle
                     * @type {String}
                     * @default no-subtitle
                     * @optional
                     **/
                    subtitle: 'no-subtitle',

                    /**
                     * Music composer
                     * @attribute composer
                     * @type {String}
                     * @default unknown
                     * @optional
                     **/
                    composer: 'unknown',

                    /**
                     * Song clef
                     * @attribute clef
                     * @type {String}
                     * @default treble
                     * @optional
                     **/
                    clef: 'treble',

                    /**
                     * Song Key Signature (https://en.wikipedia.org/wiki/Key_signature)
                     *
                     * Valid key signature:
                     *
                     * "C", "Am", "F", "Dm", "Bb", "Gm", "Eb", "Cm",
                     * "Ab", "Fm", "Db", "Bbm", "Gb", "Ebm", "Cb",
                     * "Abm", "G", "Em", "D", "Bm", "A", "F#m", "E",
                     * "C#m", "B", "G    #m", "F#", "D#m", "C#", "A#m"
                     *
                     * @attribute key_signature
                     * @type {String}
                     * @default C
                     * @optional
                     **/
                    key_signature: 'C',

                    /**
                     * Song Time Signature (https://en.wikipedia.org/wiki/Time_signature)
                     * @attribute time_signature
                     * @type {String}
                     * @default 4/4
                     * @optional
                     **/
                    time_signature: '4/4',

                    /**
                     * @attribute num_beat
                     * @type {Number}
                     * @default 4
                     * @optional
                     **/
                    num_beat: 4,

                    /**
                     * @attribute beat_value
                     * @type {Number}
                     * @default 4
                     * @optional
                     **/
                    beat_value: 4,
                };
            },

            initialize: function() {
                /**
                 * List of bars
                 * @attribute bars
                 * @type {Object} Ava.BarList
                 * @required
                 **/
                if (typeof this.get('bars') === 'object') {
                    this.set( 'bars', Ava.BarList(this.get('bars')) );
                }
            },

        });

        that = new MusicModel(spec);

    })(spec);

    /**
     * @method add_bar
     * @param {Object} Ava.Bar
     **/
    that.add_bar = function(bar) {
        if ( typeof bar !== 'object' ) {
            throw {
                name: 'invalidParam',
                message: 'Passed invalid parameter',
            };
        }

        that.set_dirty();
        that.get('bars').add(bar);
    };


    /**
     * Set dirty attribute to true
     * @method set_dirty
     **/
    that.set_dirty = function() {
        that.set('dirty', true);
    };

    /**
     * Set dirty attribute to false
     * @method unset_dirty
     **/
    that.unset_dirty = function() {
        that.set('dirty', false);
    };

    /**
     * @method is_dirty
     **/
    that.is_dirty = function() {
        return that.get('dirty') ? true : false;
    };

    return that;
}
