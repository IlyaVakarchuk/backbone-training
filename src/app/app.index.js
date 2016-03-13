var myApp = new AppModel(),
  appView = new AppView({model : myApp}),
  authModel = new AuthModel(),
  authView = new AuthView({model : authModel});

appView.render();

