$(document).ready(function () {
    window.app = new AppView();
    window.router = new AppRouter(app);
    Backbone.history.start();

    $('#search-name').focus();
});
