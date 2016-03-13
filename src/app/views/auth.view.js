var AuthView = Backbone.View.extend({
  tagName : 'div',

  id : 'authForm',

  template : _.template($('#auth-view').html()),

  events : {
    'click #auth-btn' : 'authAction'
  },

  authAction : function() {
    this.model.loginUser({email : $('#auth-email').val(), password : $('#auth-password').val()});
  },

  render : function() {
    $(this.$el.html(this.template(this.model.toJSON()))).appendTo('body');
    return this;
  }
});