var Day = Backbone.Model.extend({
});

var DayList = Backbone.Collection.extend({
    model: Day,
    url: '/api/days',

    parse: function parseF (response) {
	return response.days;
    },

    /*sync: function syncF (method, model, options) {
	var data = makeAPIRequest(this.url, { name: 'max' });
	return data;
    },*/
});
