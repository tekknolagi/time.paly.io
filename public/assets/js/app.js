$(document).ready(function () {
    window.app = new AppView();
    var router = new AppRouter();
    Backbone.history.start();

    var searchForm = $('#search-form');
    var searchName = $('#search-name');
    var searchClear = $('#search-clear');

    searchName.focus();

    searchForm.on('submit', function (e) {
	e.preventDefault();

	router.navigate('search/' + searchName.val(), { trigger: true });
    });

    searchClear.on('click', function (e) {
	router.navigate('', { trigger: true });

	searchName.val('');
	searchName.focus();
    });
});
