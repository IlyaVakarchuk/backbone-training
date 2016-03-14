var PostCollection = Backbone.Collection.extend({
  model : PostModel,
  url: 'http://localhost:3000/api/post'
});