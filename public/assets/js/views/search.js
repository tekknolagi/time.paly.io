var SearchView = GenericView.extend({
    name: 'search',

    events: {
	// 'click #search-button': 'sendSearchEvent',
	'click #search-clear': 'sendClearEvent'
    },

    initialize: function initializeF () {
	var that = this;
	$('#search-form').on('submit', function (e) {
	    e.preventDefault();
	    that.sendSearchEvent();
	});

	this.render();
    },

    sendSearchEvent: function sendSearchEventF () {
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
