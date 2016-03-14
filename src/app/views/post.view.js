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
    this.model.on('change', function(){
      this.trigger('formSubmitted');
    }, this);
    _.bindAll(this,'render');
    this.render();
  },

  deletePost : function() {

  },

  render : function() {
    $(this.$el.html(this.template(this.model.toJSON()))).appendTo('body');

    var likeItem = new postLikeView({model : this.model, parentView : this.$el});
    var deleteItem = new deletePostView({model : this.model, parentView : this.$el});

    likeItem.render();
    deleteItem.render();

    return this;
  }
});

var postLikeView = Backbone.View.extend({
  tagName : 'span',

  events : {
    'click .like-btn' : 'likePost'
  },

  initialize : function(options) {
    this.parent = options.parentView;
  },

  likePost : function(e) {
    //this.model.set({'like' : this.model.get('like') + 1});
    this.model.likePost();
    this.render();
  },

  template: _.template("<span class='like-btn'><%= like %></span>"),

  render : function() {
    this.parent.find('.like-container').append($(this.$el.html(this.template(this.model.toJSON()))))
    return this;
  }
});

var deletePostView = Backbone.View.extend({
  tagName : 'span',

  events : {
    'click .delete-btn' : 'deletePost'
  },

  initialize : function(options) {
    this.parent = options.parentView;
  },

  deletePost : function(e) {
    this.render();
  },

  template: _.template("<span class='delete-btn'>DELETE</span>"),

  render : function() {
    this.parent.find('.delete-container').append($(this.$el.html(this.template(this.model.toJSON()))))
    return this;
  }
})

