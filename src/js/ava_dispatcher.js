/**
 * Ava Dispatcher Class
 * @example
 *      // Set the event listener
 *      this.listenTo( Ava.Dispatcher, 'toolbar:add_bar', function() { alert("Yeyyyy I'm listening"); } );
 *
 *      // Somewhere else:
 *      // Trigger the event
 *      that.$el.find('#toolbar-btn-add-bar')
 *          .click( function() { Ava.Dispatcher.trigger( 'toolbar:add_bar' ); } );
 *
 * @class Ava.Dispatcher
 **/
Ava.Dispatcher = (function() {
    var that = _.clone( Backbone.Events );
    return that;
})();
