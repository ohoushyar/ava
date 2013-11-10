/**
 * Music View
 * @class Ava.MusicView
 * @constructor
 * @param {Object} spec
 * @extends Backbone.View
 **/
Ava.MusicView = function(spec) {
    var that = {};
    var cursor;

    /**
     * @method addbar_onclick_handler
     * @private
     **/
    var addbar_onclick_handler = function() {
        var bar = {
            clef:                 Ava.Context.cc(),
            show_clef:            false,
            key_signature:        Ava.Context.ck(),
            time_signature:       Ava.Context.ct(),
            show_time_signature:  false,
            notes:                [],
        };

        add_bar(bar);
    }

    /**
     * @method music_onclick_handler
     * @private
     * @param {Object} event
     * @param {Object} jQuery clicked object
     **/
    var music_onclick_handler = function(e, $clicked) {

        var containerOffset = {top: 0, left: 0};
        containerOffset.left = Math.floor($clicked.offset().left);
        containerOffset.top = Math.floor($clicked.offset().top);
        console.debug( $clicked.offset());

        console.debug('e: ' + e.pageY + ', ' + e.pageX);
        var bar_view, c_width, c_height, c_y;
        var mouse_x = e.pageX - containerOffset.left;
        var mouse_y = e.pageY - containerOffset.top;
        console.debug('e - offset: ' + mouse_y + ', ' + mouse_x);

        try {
            // get bar over which the mouse move and pass it to get_hot_spot
            bar_view = get_bar_view_of(mouse_x);
        } catch (e) {
            // do nothing
        }

        // move the cursor to hot spot over the stave
        if (typeof bar_view === 'object') {
            c_width = c_height = 10;
            c_y = bar_view.stave.get_y_hot_spot(mouse_y) - (c_height/2);
            console.debug( 'y hot spot: ' + mouse_y );
        }
        // calculate the hot spot and return the postion
        var move = _.bind( cursor.resize_and_move, cursor );
        // Call move in defer as it's pretty expensive to run and render
        _.defer( move, c_width, c_height, mouse_x, c_y);

        // add note
        bar_view.add_note_by_y( mouse_y );
    };

    (function(spec){
        var View = Backbone.View.extend({

            initialize: function() {
                this.model.get('bars').on('add', this.render, this);
                //this.model.on("change:dirty", this.render, this);

                this.listenTo( Ava.Dispatcher , 'toolbar_addbar_onclick' , addbar_onclick_handler );
                this.listenTo( Ava.Dispatcher , 'music_onclick'          , music_onclick_handler );
            },

            /**
             * @method render
             **/
            render: function() {
                if (this.model.is_dirty()) {
                    // Clear the ctx
                    Ava.Context.vexflow_ctx().clear();
                    // Reset current x and y
                    Ava.Context.reset_currents();
                    // Not dirty anymore
                    this.model.unset_dirty();
                }

                // Run views of each bar
                this.model.get('bars').forEach( this._render_bar, this);

                cursor = Ava.CursorView({
                        model: Ava.Cursor({})
                    }).render();

                add_click_to_canvas();

                return this;
            },

            /**
             * @method _render_bar
             * @param {Object} Ava.Bar
             * @private
             **/
            _render_bar: function(bar) {
                var bar_model = bar;
                // every time set x and y of a new bar according to ctx or perhaps
                // previous bar position which would be x + width
                bar_model.set_x(Ava.Context.current_x());
                bar_model.set_y(Ava.Context.current_y());

                var bar_view = Ava.BarView( {model: bar_model} );

                bar_view.render();
                that.bars.push(bar_view);

            },

        });

        that = new View(spec);
        that.bars = [];
    })(spec);

    /**
     * @method add_click_to_canvas
     **/
    var add_click_to_canvas = function() {
        that.$el.find('#ava-canvas svg')
            .click( function(e) { Ava.Dispatcher.trigger( 'music_onclick', e, $(this) ) } );
    };

    /**
     * @method add_bar
     * @param {Object} spec Ava.Bar
     **/
    var add_bar = function(spec) {
        that.model.add_bar( Ava.Bar(spec) );
    };


    /**
     * Return BarView object of passed x and y
     * TODO: It could accept y when we have wrap enable
     *
     * @method get_bar_view_of
     * @param {Number} x
     * @return {Object} Ava.BarView
     **/
    var get_bar_view_of = function( x ) {
        var bar_x, bar_w, i;

        if ( typeof x === 'undefined' ) {
            throw {
                name: 'reqParam',
                message: "x is required"
            };
        }

        for (i=0; i < that.bars.length; i+=1) {
             bar_x = that.bars[i].model.get('x');
             bar_w = that.bars[i].model.get('width');
            if (x >= bar_x && x < bar_x + bar_w) {
                return that.bars[i];
            }
        }

        throw {
            name: 'outOfRange',
            message: "No bar found for x: " + x,
        };
    };

    that.add_bar = add_bar;
    that.get_bar_view_of = get_bar_view_of;

    return that;
};
