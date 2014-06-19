var UserListView = GenericView.extend({
    name: 'user-list',

    events: {
	'submit #user-list-form': 'sendSearchEvent',
	'click #user-list-button': 'sendSearchEvent'
    },

    initialize: function initializeF (options) {
	this.options = options;
	_.bindAll(this, 'render');
	this.collection = new UserList();

	var that = this;
	this.collection.fetch({
	    success: that.render,
	    error: function (c, response, o) {
		var parsed = JSON.parse(response.responseText);
		var errorView = new ErrorView(parsed);

		app.addSubview(errorView);
	    }
	});
    },

    sendSearchEvent: function sendSearchEventF (e) {
	e.preventDefault();

	var name = $('#user-list-picker').val();
	router.navigateTo('search', { name: name });
    },

    render: function renderF () {
	var template = this.fetchTemplate();
	var data = { users: this.collection.toJSON() };
	var markup = template(data);
	this.theEl().html(markup);
	return this;
    }
});
