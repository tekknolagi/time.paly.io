var GenericView = Backbone.View.extend({ 
    renderFrom: function renderFromF () { return $(this.template); },
    renderTo: function renderToF () { return $('#container'); },
    fetchTemplate: function fetchTemplateF () { return _.template(this.renderFrom().html()); },
});
