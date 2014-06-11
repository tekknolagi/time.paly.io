var DayListView = GenericView.extend({
    el: '#day-list-view',
    template: '.day-list-template',

    initialize: function initializeF (options) {
	this.options = options;
	_.bindAll(this, 'render');
	this.collection = new DayList();

	var that = this;
	this.collection.fetch({
	    data: { name: options.name },
	    success: that.render,
	    error: function (c, response, o) {
		var parsed = JSON.parse(response.responseText);
		var errorView = new ErrorView(parsed);
	    }
	});
    },

    render: function renderF () {
	var template = this.fetchTemplate();
	var data = { name: this.options.name, days: this.collection.toJSON() };
	var markup = template(data);
	this.$el.html(markup);
	return this;
    }
});
