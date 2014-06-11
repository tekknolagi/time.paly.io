var GenericView = Backbone.View.extend({ 
    renderFrom: function renderFromF () { return $(this.template); },
    fetchTemplate: function fetchTemplateF () { return _.template(this.renderFrom().html()); },
});
