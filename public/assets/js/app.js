$(document).ready(function () {
    routie({
	'': function () {
	    $('#container').html('');
	},
	'search/:name': function (name) {
	    new StatsView({ name: name });
	    new DayListView({ name: name });
	}
    });

    var searchForm = $('#search-form');
    var searchName = $('#search-name');
    var searchClear = $('#search-clear');

    searchName.focus();

    searchForm.on('submit', function (e) {
	e.preventDefault();

	routie('search/'+searchName.val());
    });

    searchClear.on('click', function (e) {
	routie('');
	searchName.val('');
    });
});
