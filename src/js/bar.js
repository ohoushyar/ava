/**
 * Bar (or measure) is a segment of time defined by a given number of
 * beats, each of which are assigned a particular note value
 * (https://en.wikipedia.org/wiki/Bar_%28music%29)
 *
 * @example
 *      bar = Ava.Bar({
 *          clef: 'treble',
 *          show_clef: true,
 *          key_signature: 'G',
 *          num_beats: 3,
 *          beat_value: 4,
 *          show_time_signature: true,
 *          notes: [
 *              { keys: ["d/4"], duration: "q" },
 *              { keys: ["b/4"], duration: "qr" },
 *              { keys: ["c/4"], duration: "q" },
 *              { keys: ["d/4"], duration: "q" },
 *          ],
 *      });
 *
 * @class Ava.Bar
 * @constructor
 * @param {Object} spec An object to init a Bar
 * @uses Ava.TickableList
 * @extend Backbone.Model
 **/
Ava.Bar = function (spec) {

    var that = {};

    ( function(spec) {

        var BarModel = Backbone.Model.extend({
            defaults: function() {
                return {

                    /**
                     * Bar x
                     * @attribute x
                     * @type {Number}
                     * @default 0
                     * @optional
                     **/
                    x: 0,

                    /**
                     * Bar y
                     * @attribute y
                     * @type {Number}
                     * @default 0
                     * @optional
                     **/
                    y: 0,

                    /**
                     * Bar width
                     * @attribute width
                     * @type {Number}
                     * @default (defined in Ava.Constant)
                     * @optional
                     **/
                    width: Ava.Constant.BAR_DEFAULT_WIDTH,

                    /**
                     * Bar height
                     * @attribute height
                     * @type {Number}
                     * @default (defined in Ava.Constant)
                     * @optional
                     **/
                    height: Ava.Constant.BAR_DEFAULT_HEIGHT,

                    /**
                     * Flag to represent showing of clef in bar
                     * @attribute show_clef
                     * @type {Boolean}
                     * @default false
                     * @optional
                     **/
                    show_clef: false,

                    /**
                     * @attribute num_beats
                     * @type {Number}
                     * @default 4
                     * @optional
                     **/
                    num_beats: 4,

                    /**
                     * @attribute beat_value
                     * @type {Number}
                     * @default 4
                     * @optional
                     **/
                    beat_value: 4,

                    /**
                     * Flag to represent showing of time signature in bar
                     * @attribute show_time_signature
                     * @type {Boolean}
                     * @default false
                     * @optional
                     **/
                    show_time_signature: false,

                    /**
                     * @attribute key_signature
                     * @type {String}
                     * @default C
                     * @optional
                     **/
                    key_signature: 'C',

                    /**
                     * Flag to represent showing of key signature in bar
                     * @attribute show_key_signature
                     * @type {Boolean}
                     * @default false
                     * @optional
                     **/
                    show_key_signature: false,
                };
            },

            initialize: function() {

                /**
                 * List of notes
                 * @attribute notes
                 * @type {Object} Ava.NoteList
                 * @required
                 **/
                if (typeof this.get('notes') !== 'object') {
                    throw {
                        name: 'invalidParam',
                        message: 'Passed invalid parameter. notes have to be an array',
                    };
                }
                // Init list of notes
                this.set( 'notes', new Ava.TickableList(this.get('notes')) );

                this.set( 'time_signature', this.get('num_beats') + "/" + this.get('beat_value') );
            },

        });

        that = new BarModel(spec);

    })(spec);

    /**
     * @method add_note
     * @param {Object} Ava.Tickable
     **/
    that.add_note = function(tickable) {
        if ( typeof tickable !== 'object' ) {
            throw {
                name: 'invalidParam',
                message: 'Passed invalid parameter',
            };
        }

        that.get('notes').add(tickable);
    };

    /**
     * @method set_x
     * @param {Number} x
     **/
    that.set_x = function(x) {
        that.set('x', x);
    };

    /**
     * @method set_y
     * @param {Number} y
     **/
    that.set_y = function(y) {
        that.set('y', y);
    };


    /**
     * @method get_stave
     * @return {Object} Ava.Stave
     **/
    that.get_stave = function() {
        var stave_param = {
            x: that.get('x'),
            y: that.get('y'),
            width: that.get('width'),
        };

        // Show clef
        if (that.get('show_clef') && typeof that.get('clef') === 'string') {
            stave_param.clef = that.get('clef');
        }
        // Show time signature
        if (that.get('show_time_signature')) {
            var time_signature = that.get('num_beats') + '/' + that.get('beat_value');
            stave_param.time_signature = time_signature;
        }
        // Show key signature
        if (that.get('show_key_signature')) {
            stave_param.key_signature = that.get('key_signature');
        }

        return Ava.Stave(stave_param);

    };

    return that;
};

/**
 * Represents a collection of Bars
 * @class Ava.BarList
 * @constructor
 * @param {Array} spec Array of Ava.Bar object
 * @uses Ava.Bar
 * @extends Backbone.Collection
 **/
Ava.BarList = function(spec) {
    var List = Backbone.Collection.extend({
        model: Ava.Bar,
    });
    return new List(spec);
};
