/*

Courtesy of tgriesser from

https://github.com/jashkenas/backbone/issues/2490

*/

var View = Backbone.View;

Backbone.View = Backbone.View.extend({
    constructor: function constructorF () {
	this.subviews = [];
	View.apply(this, arguments);
    },

    addSubview: function addsubviewF (view) {
	if (!(view instanceof Backbone.View)) {
	    throw new Error("Subviews must be a Backbone.View");  
	}
	this.subviews.push(view);
	return view;
    },

    addSubviews: function addSubviewsF () {
	for (var i = 0; i < arguments.length; i++) {
	    this.addSubview(arguments[i]);
	}
    },

    removeSubviews: function removeSubviewsF () {
	var children = this.subviews;
	for (var i = 0, l = children.length; i<l; i++) {
	    children[i].remove();
	}
	this.subviews = [];
	return this;
    },

    remove: function removeF () {
	this.removeSubviews();
	View.prototype.remove.apply(this, arguments);
    }
});

