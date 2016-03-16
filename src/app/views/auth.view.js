var AuthView = Backbone.View.extend({
  tagName : 'div',

  id : 'authForm',

  template : _.template($('#auth-view').html()),

  initialize : function() {
    this.model.on('change:state', this.close, this);
  },

  render : function() {
    $(this.$el.html(this.template(this.model.toJSON()))).appendTo('#auth-form-container');
    this.delegateEvents();
    return this;
  },

  close : function() {
    this.remove();
  }
});