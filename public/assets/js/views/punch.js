var PunchView = GenericView.extend({
    name: 'punch',

    events: {
	'submit #punch-form': 'sendPunchEvent'
    },

    initialize: function initializeF (options) {
	this.options = options;
	this.options.opposite_status = options.status == 'in' ? 'out' : 'in';
	this.render();
    },

    sendPunchEvent: function sendPunchEventF (e) {
	e.preventDefault();

	var formData = $('#punch-form').serialize();
	console.log(formData);
	$.get('/api/punch', formData).
	    success(function (data) {
		console.log("returned from punch: ", data);
		var statsView = new StatsView(data);
		var dayListView = new DayListView(data);

		app.addSubviews(statsView, dayListView);
	    }).
	    error(function (e) {
		alert(JSON.stringify(e));
	    });
    }
});
