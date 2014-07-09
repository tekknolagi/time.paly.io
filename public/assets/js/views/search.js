var SearchView = GenericView.extend({
    name: 'search',

    events: {
	'submit #search-form': 'sendSearchEvent',
	'click #search-clear': 'sendClearEvent'
    },

    initialize: function initializeF (options) {
	this.options = options;
	this.render();
    },

    sendSearchEvent: function sendSearchEventF (e) {
	e.preventDefault();

	var name = $('#search-name').val();
	router.navigateTo('search', { name: name });
    },

    sendClearEvent: function sendClearEventF () {
	router.navigateTo('blank');
	searchName.val('');
	searchName.focus();
    },

    render: function renderF () {
	var template = this.fetchTemplate();
	var data = this.options;
	var markup = template(data);
	this.theEl().html(markup);
	return this;
    },

    remove: function removeF () {
	return this;
    }
});
