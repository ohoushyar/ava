var AvaView = Backbone.View.extend({
    render: function() {
        var $element = $('<h3>The result would show here ...</h3>');
        this.$el.append($element);
    },
});
