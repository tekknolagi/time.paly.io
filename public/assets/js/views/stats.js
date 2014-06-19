var StatsView = GenericView.extend({
    name: 'stats',

    initialize: function initializeF (options) {
	this.options = options;
	_.bindAll(this, 'render');
	this.model = new Stats();

	var that = this;
	this.model.fetch({
	    data: { name: options.name },
	    success: function (c, response, a) {
		var nameView = new NameView(response);
		var punchView = new PunchView(response);

		app.addSubviews(nameView, punchView);
		that.render();
	    },
	    error: function (c, response, o) {
		if (response.responseText == 'undefined') {
		    var parsed = JSON.parse(response.responseText);
		    var errorView = new ErrorView(parsed);
		}
		else {
		    var errorView = new ErrorView({ error: 'Unknown error.' });
		}
	    }
	});
    },

    render: function renderF () {
	var template = this.fetchTemplate();
	var data = this.model.toJSON();
	var markup = template(data);
	this.theEl().html(markup);
	return this;
    }
});
