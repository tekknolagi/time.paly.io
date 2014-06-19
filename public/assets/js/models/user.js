var User = Backbone.Model.extend({});

var UserList = Backbone.Collection.extend({
    model: User,
    url: '/api/users'
});
