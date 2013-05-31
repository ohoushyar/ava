/*
 * Music View
 */
Ava.MusicView = Backbone.View.extend({

    initialize: function() {
    },

    render: function() {
        var that = this;

        // Run views of each bar
        this.model.get('bars').forEach( this.render_bar, this);

        // I can set the width of ctx to default and 

        return that;
    },

    render_bar: function(bar) {
        var bar_model = Ava.Bar(bar)
        // every time set x and y of a new bar according to ctx or perhaps
        // previous bar position which would be x + width
        bar_model.set_x(Ava.Context.current_x);
        bar_model.set_y(Ava.Context.current_y);

        var bar_view = new Ava.BarView( {model: bar_model} );

        bar_view.render();
    },

});
