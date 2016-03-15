var AppRoute = Backbone.Router.extend({

  routes : {
    "!/" : "home",
    "!/auth" : "auth",
    '!/auth-user' : 'authUser',
    "!/post" : "post",
    "!/logout" : "logout"
  },


  home : function() {
    if (authModel.get('state')) {
      this.navigate('!/post', {trigger: true});
    } else {
      authView.close();
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
    if (authModel.get('state')) {
      postCollections.fetch({reset : true });
    } else {
      this.navigate('!/', {trigger: true});
    }
  },

  logout : function() {
    authModel.logout();
  }
});

Backbone.history.start();