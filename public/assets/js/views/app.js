var AppView = GenericView.extend({
    initialize: function initializeF () {
	for (var i = 0; i < arguments.length; i++) {
	    this.addSubView(arguments[i]);
	}
    }
});
