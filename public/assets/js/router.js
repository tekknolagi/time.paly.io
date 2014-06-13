var AppRouter = Backbone.Router.extend({
    routes: {
	'': 'blank',
	'search/:name': 'search'
    },

    blank: function blankF () {
	app.removeSubviews();
    },

    search: function searchF (name) {
	var statsView = new StatsView({ name: name });
	var dayListView = new DayListView({ name: name });

	app.addSubviews(statsView, dayListView);
    }
});
