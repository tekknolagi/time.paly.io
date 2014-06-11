$(document).ready(function () {
    routie({
	'': function () {
	    $('#container').html('');
	},
	'search/:name': function (name) {
	    new DayListView({ name: name });
	    new StatsView({ name: name });
	}
    });

    var searchForm = $('#searchform');
    var searchName = $('#searchname');
    var searchClear = $('#searchclear');

    searchName.focus();

    searchClear.on('click', function (e) {
	routie('');
	searchName.val('');
    });

    searchForm.on('submit', function (e) {
	e.preventDefault();
	routie('search/'+searchName.val());
	searchName.val('');
    });

});
