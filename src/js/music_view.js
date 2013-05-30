/*
 * Music View
 */
Ava.MusicView = Backbone.View.extend({

    initialize: function() {
    },

    render: function() {
        var that = this;
        var ctx = Vex.Flow.Renderer.buildContext(this.model.get('canvas_id'), Vex.Flow.Renderer.Backends.RAPHAEL, 500, 120);

        // Run views of each bar
        // I need to access to this ctx from other views
        //
        // I can set the width of ctx to default and 

        return that;
    },

});
