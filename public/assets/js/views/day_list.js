var DayListView = GenericView.extend({
    template: '.day-list-template',

    initialize: function initializeF (options) {
	_.bindAll(this, 'render');
	this.collection = new DayList();

	var that = this;
	this.collection.fetch({
	    data: { name: options.name },
	    success: that.render,
	    error: function (collection, response, options) {
		var parsed = JSON.parse(response.responseText);
		var errorView = new ErrorView(parsed);
	    }
	});
    },

    render: function renderF () {
	var template = this.fetchTemplate();
	var data = { days: this.collection.toJSON() };
	var markup = template(data);
	this.renderTo().html(markup);
	return this;
    }
});
