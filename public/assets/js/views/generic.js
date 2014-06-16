var GenericView = Backbone.View.extend({ 
    theEl: function theElF () { this.$el = $('#' + this.name + '-view'); return this.$el; },
    template: function templateF () { return $('.' + this.name + '-template'); },
    fetchTemplate: function fetchTemplateF () { return _.template(this.template().html()); },

    initialize: function initializeF (options) {
	this.options = options;
	this.render();	
    },

    render: function renderF () {
	var template = this.fetchTemplate();
	var data = this.options;
	var markup = template(data);
	this.theEl().html(markup);
	return this;
    },

    remove: function removeF () {
      this.theEl().empty();
      this.stopListening();
      return this;
    }
});
