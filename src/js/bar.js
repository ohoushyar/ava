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
 *          num_beat: 3,
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

                    /**
                     * Flag to represent showing of time signature in bar
                     * @attribute show_time_signature
                     * @type {Boolean}
                     * @default false
                     * @optional
                     **/
                    show_time_signature: false,
                };
            },

            initialize: function() {
                this.set( 'stave', Ava.Stave({
                    x: this.get('x'),
                    y: this.get('y'),
                    width: this.get('width'),
                }) );

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

                this.set( 'time_signature', this.get('num_beat') + "/" + this.get('beat_value') );
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
