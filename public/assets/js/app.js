$(document).ready(function () {
    routie({
	'': function () {
	    $('#container').html('');
	},
	'days/:name': function (name) {
	    new DayListView({ name: name });
	}
    });

    $('#dayname').focus();

    $('#dayclear').on('click', function (e) {
	routie('');
	$('#dayname').val('').focus();
    });

    $('#dayform').on('submit', function (e) {
	e.preventDefault();
	var name = $('#dayname');
	routie('days/'+name.val());
	name.val('');
    });

});
