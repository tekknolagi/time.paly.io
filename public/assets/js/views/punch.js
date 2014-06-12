var PunchView = GenericView.extend({
    el: '#punch-view',
    template: '.punch-template',

    events: {
	'click #punch-button': 'sendPunchEvent'
    },

    initialize: function initializeF (options) {
	this.options = options;
	this.options.opposite_status = options.status == 'in' ? 'out' : 'in';
	this.render();
    },

    sendPunchEvent: function sendPunchEventF () {
	var req = $.get('/api/punch', $('#punch-form').serialize());
	req.success(function (data) {
	    var statsView = new StatsView(data);
	    var dayListView = new DayListView(data);
	}).error(function (e) {
	    alert(e)
	});
    },

    render: function renderF () {
	var template = this.fetchTemplate();
	var data = this.options;
	var markup = template(data);
	this.$el.html(markup);
	return this;
    }
});
