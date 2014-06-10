routie({
    'days/:name': function (name) {
	new DayListView({ name: name });
    }
});
