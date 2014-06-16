var PunchView = GenericView.extend({
    name: 'punch',

/*    events: {
	'submit #punch-form': 'sendPunchEvent'
    },*/

    initialize: function initializeF (options) {
	this.options = options;
	this.options.opposite_status = options.status == 'in' ? 'out' : 'in';

	var that = this;
	$('#punch-form').on('submit', function (e) {
	    e.preventDefault();
	    console.log('howdy');
	    that.sendPunchEvent();
	});

	this.render();
    },

    sendPunchEvent: function sendPunchEventF () {
	console.log('punching');

	var formData = $('#punch-form').serialize();
	$.get('/api/punch', formData).
	    success(function (data) {
		var statsView = new StatsView(data);
		var dayListView = new DayListView(data);

		app.addSubviews(statsView, dayListView);
	    }).
	    error(function (e) {
		alert(e)
	    });
    }
});
