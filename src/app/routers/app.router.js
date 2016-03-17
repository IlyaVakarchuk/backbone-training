define(['backbone',
  'underscore',
  'jquery'],
  function(Backbone, _, $){
    var AppRoute = Backbone.Router.extend({

      routes : {
        "!/" : "home",
        "!/auth" : "auth",
        '!/auth-user' : 'authUser',
        "!/post" : "post",
        "!/logout" : "logout"
      },

      initialize : function(authModel, authView,appView, postCollections) {
        this.authView = authView;
        this.authModel = authModel;
        this.appView = appView;
        this.postCollections = postCollections;
      },


      home : function() {
        if (this.authModel.get('state')) {
          this.navigate('!/post', {trigger: true});
        } else {
          this.authView.close();
          this.appView.render();
        }
      },

      auth : function() {
        console.log( this.authView);
        this.authView.render();
      },

      authUser : function() {
        this.authModel.authUser({action : 'auth', email : $('#auth-email').val(), password : $('#auth-password').val()});
        this.navigate('!/auth', {trigger: true});
      },

      post : function() {
        if (this.authModel.get('state')) {
          this.postCollections.fetch({reset : true });
        } else {
          this.navigate('!/', {trigger: true});
        }
      },

      logout : function() {
        this.authModel.logout();
      }
    });

    return AppRoute


});