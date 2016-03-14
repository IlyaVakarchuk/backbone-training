var AppView = Backbone.View.extend({
  tagName : 'div',

  template : _.template($('#site').html()),

  initialize : function() {
      this.model.on('change:loginSate', this.render, this);
  },
/*
  events : {
    'click a#auth-login-btn' : 'loginAction',
    'click a#auth-registration-btn' : 'registrationAction'
  },

  loginAction : function() {
    authModel.set({action : 'login'});
    authView.render();
  },

  registrationAction : function() {
    authModel.set({action : 'registration'});
    authView.render();
  }, */

  render : function () {
    $(this.$el.html(this.template(this.model.toJSON()))).appendTo('div#main-wrap');
    return this;
  }

});