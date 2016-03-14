var AppRoute = Backbone.Router.extend({

  routes : {
    "" : "home",
    "!/auth" : "auth",
    '!/auth-user' : 'authUser',
    "!/post" : "post"
  },


  home : function() {
    if (myApp.get('loginSate')) {
      this.navigate('!/post', {trigger: true});
    } else {
      appView.render();
    }
  },

  auth : function() {
    authView.render();
  },

  authUser : function() {
    authModel.authUser({email : $('#auth-email').val(), password : $('#auth-password').val()});
  },

  post : function() {
    if (myApp.get('loginSate')) {
      postCollections.fetch({reset : true});
    } else {
      this.navigate('!/', {trigger: true});
    }
  },

  denied : function() {
    console.log('denied');
    this.navigate('home')
  }
});

var appRoute = new AppRoute();

Backbone.history.start();