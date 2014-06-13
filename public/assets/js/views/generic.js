var GenericView = Backbone.View.extend({ 
    renderFrom: function renderFromF () { return $(this.template); },
    fetchTemplate: function fetchTemplateF () { return _.template(this.renderFrom().html()); },

    remove: function removeF () {
      this.$el.empty();
      this.stopListening();
      return this;
    }
});
