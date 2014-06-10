var DayListView = Backbone.View.extend({
    initialize: function initializeF (options) {
	_.bindAll(this, 'render');
	this.collection = new DayList();

	var that = this;
	this.collection.fetch({
	    data: { name: options.name },
	    success: that.render
	});
    },

    template: '.day-list-template',
    renderFrom: function renderFromF () { return $(this.template); },
    renderTo: function renderToF () { return $('#container'); },
    fetchTemplate: function fetchTemplateF () { return _.template(this.renderFrom().html()); },

    render: function renderF () {
	var template = this.fetchTemplate();
	var data = { days: this.collection.toJSON() };
	var markup = template(data);
	this.renderTo().html(markup);
	return this;
    }
});
