/*
 * AvaView View class
 * Extend from Backbone.View
 *
 * To run the app:
 *
 *   var app_view = new Ava.View({
 *       el: $("#music_wysiwyg"), // The id of the div
 *   });
 *   app_view.render();
 *
 */
Ava.View = Backbone.View.extend({

    render: function() {
        this.$el.html('this is a test');
        return this;
    },

});
