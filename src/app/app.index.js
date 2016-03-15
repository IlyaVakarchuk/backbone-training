var appRoute = new AppRoute(),
  myApp = new AppModel(),
  appView = new AppView({model : myApp}),
  authModel = new AuthModel({state : myApp.get('loginState')}),
  authView = new AuthView({model : authModel}),
  postCollections = new PostCollection(),
  postsView = new PostsView({collection : postCollections});

appView.render();

