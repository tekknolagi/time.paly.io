var SearchView = GenericView.extend({
    name: 'search',

    events: {
	'submit #search-form': 'sendSearchEvent',
	'click #search-clear': 'sendClearEvent'
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

    remove: function removeF () {
	return this;
    }
});
