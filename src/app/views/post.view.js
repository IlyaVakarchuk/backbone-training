define(['backbone','underscore', 'jquery', 'postItemView'], function(Backbone, _, $, postItemView) {
  var PostsView = Backbone.View.extend({

    tagName : 'ul',

    initialize : function(opt) {

      this.collection = opt.collection;

      this.listenTo(this.collection, 'reset', function(){
        this.collection.trigger('checkState');
        this.render();
      })
    },

    render : function() {
      this.$el.empty();
      this.delegateEvents();
      this.collection.each(function(Post) {
        var postItem = new postItemView({model : Post});

        this.$el.append(postItem.render().el);
      }, this);

     $(this.$el).appendTo('#post-from-server');
      return this;
    },

    removeView : function() {
      this.$el.empty();
    }
  });

  return PostsView;
});