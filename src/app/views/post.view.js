var PostsView = Backbone.View.extend({

  tagName : 'ul',

  initialize : function() {
    this.listenTo(this.collection, 'reset', this.render);
  },

  render : function() {
    this.close();
    this.collection.each(function(Post) {
      var postItem = new postItemView({model : Post});
      this.$el.append(postItem.render().el);
    }, this);

    $(this.$el).appendTo('body');

    return this;
  },

  close : function(callback) {
    this.remove();
    this.unbind();
  }
});

var postItemView = Backbone.View.extend({
  tagName : 'li',

  className : 'post-item',

  template : _.template($('#posts-view').html()),

  initialize : function() {
    _.bindAll(this,'render');
    this.render();
  },

  render : function() {
    $(this.$el.html(this.template(this.model.toJSON()))).appendTo('body');
    return this;
  }
});



