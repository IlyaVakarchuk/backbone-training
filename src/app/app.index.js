/*var appRoute = new AppRoute(),
  myApp = new AppModel(),
  appView = new AppView({model : myApp}),
  authModel = new AuthModel({state : myApp.get('loginState')}),
  authView = new AuthView({model : authModel}),
  postCollections = new PostCollection(),
  postsView = new PostsView({collection : postCollections});

appView.render();

*/

requirejs.config({
  paths: {
    appModel : 'models/app.model',
    authModel : 'models/auth.model',
    postModel : 'models/post.model',

    postCollection : 'collections/post.collection',

    appView : 'views/app.view',
    authView : 'views/auth.view',
    postView : 'views/post.view',

    appRoute : 'routers/app.router',

    /*
    appView : 'views/app.view',
    authView : 'views/auth.view',
    postView : 'views/post.view',



    appRoute : 'routers/app.router',
*/
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
  'appRoute'],
    function(Backbone, _, $, AppModel, AuthModel, PostModel, PostCollection, AppView, AuthView, AppRoute) {
      $(document).ready(function(){
        var myApp = new AppModel(), authModel = new AuthModel({state : myApp.get('loginState')}),
          postCollections = new PostCollection(),
          appView = new AppView({model : myApp}), authView = new AuthView({model : authModel});

        var appRoute = new AppRoute();

        Backbone.history.start(Backbone,_, $, authModel,authView, appView, PostCollection);

        appView.render();
      });
    });