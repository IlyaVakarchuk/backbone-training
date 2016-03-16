define(['backbone', 'underscore'], function(Backbone, _) {
  var AppView = Backbone.View.extend({
    tagName : 'div',

    template : _.template($('#site').html()),

    initialize : function() {
      this.model.on('change:loginState', this.render, this);
    },

    render : function () {
      $(this.$el.html(this.template(this.model.toJSON()))).appendTo('div#main-wrap');
      return this;
    }

  });

  return AppView;
});