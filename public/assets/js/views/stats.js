var StatsView = GenericView.extend({
    el: '#stats-view',
    template: '.stats-template',

    initialize: function initializeF (options) {
	this.options = options;
	_.bindAll(this, 'render');
	this.model = new Stats();

	var that = this;
	this.model.fetch({
	    data: { name: options.name },
	    success: function (c, response, a) {
		var nameView = new NameView(response);
		that.render();
	    },
	    error: function (c, response, o) {
		var parsed = JSON.parse(response.responseText);
		var errorView = new ErrorView(parsed);
	    }
	});
    },

    render: function renderF () {
	var template = this.fetchTemplate();
	var data = this.model.toJSON();
	var markup = template(data);
	this.$el.html(markup);
	return this;
    }
});
