/**
 * Ava Dispatcher Class
 * @class Ava.Dispatcher
 * @params {Object} ctx the object through which we can access to event handlers
 **/
Ava.Dispatcher = (function() {
    var that = _.clone( Backbone.Events );
    return that;
})();
