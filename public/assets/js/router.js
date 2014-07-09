var AppRouter = Backbone.Router.extend({
    routes: {
	'': 'blank',
	'search/:name': 'search'
    },

    initialize: function initializeF (app) {
	this.app = app;
    },

    invertedRoutes: function invertedRoutesF () {
	return _.invert(this.routes);
    },

    // requires ONE TO ONE mapping of routes->callbacks
    navigateTo: function navigateToF (route, params) {
	if (params !== 'undefined') {
	    this.navigate(this.invertedRoutes()[route].supplant(params),
			  { trigger: true });
	}
	else {
	    this.navigate(this.invertedRoutes()[route],
			  { trigger: true });
	}
    },

    blank: function blankF () {
	this.app.removeSubviews();
	var searchView = new SearchView();
	app.addSubview(searchView);
    },

    search: function searchF (name) {
	var searchView = new SearchView({ name: name });
	var statsView = new StatsView({ name: name });
	var dayListView = new DayListView({ name: name });

	this.app.addSubviews(searchView, statsView, dayListView);
    }
});
