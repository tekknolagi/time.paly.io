var Day = Backbone.Model.extend({});

var DayList = Backbone.Collection.extend({
    model: Day,
    url: '/api/days',

    parse: function parseF (response) {
	return response.days;
    },
});
