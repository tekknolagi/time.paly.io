var ErrorView = GenericView.extend({
    el: '#container',
    template: '.error-template',

    initialize: function initializeF (options) {
	this.options = options;
	this.render();
    },

    render: function renderF () {
	var template = this.fetchTemplate();
	var data = this.options;
	var markup = template(data);
	this.$el.html(markup);
	return this;
    }
});
