requirejs.config({
  paths: {
    appModel : 'models/app.model',
    authModel : 'models/auth.model',
    postModel : 'models/post.model',

    postCollection : 'collections/post.collection',

    appView : 'views/app.view',
    authView : 'views/auth.view',

    postView : 'views/post.view',
    postItemView : 'views/post.item.view',
    postItemLikeView : 'views/post.item.like.view',
    postItemDeleteView : 'views/post.item.delete.view',

    appRoute : 'routers/app.router',

    backbone : '../assets/vendors/js/backbone.min',
    underscore : '../assets/vendors/js/underscore.min',
    jquery : '../assets/vendors/js/jquery.min',
    materialize : '../assets/vendors/js/materialize.min'
  }
});


requirejs([
  'backbone',
  'underscore',
  'jquery',
  'appModel',
  'authModel',
  'postModel',
  'postCollection',
  'appView',
  'authView',
  'postView',
  'postItemView',
  'postItemLikeView',
  'postItemDeleteView',
  'appRoute'],
    function(Backbone, _, $, AppModel, AuthModel, PostModel, PostCollection, AppView, AuthView,PostView, postItemView, postItemLikeView, postItemDeleteView, AppRoute) {
      $(document).ready(function(){


        var myApp = new AppModel(),
          authModel = new AuthModel({state : myApp.get('loginState'), myApp : myApp}),
          postCollections = new PostCollection({authModel : authModel}),
          appView = new AppView({model : myApp}),
          authView = new AuthView({model : authModel}),
          postView = new PostView({collection : postCollections}),
          appRoute = new AppRoute(authModel, authView,appView, postCollections);

        appView.render();

        Backbone.history.start();
        Backbone.history.navigate('!/', {trigger:true});
      });
    });