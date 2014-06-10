var ErrorView = GenericView.extend({
    template: '.error-template',

    initialize: function initializeF (options) {
	this.options = options;
	this.render();
    },

    render: function renderF () {
	var template = this.fetchTemplate();
	var data = this.options;
	var markup = template(data);
	this.renderTo().html(markup);
	return this;
    }
});
