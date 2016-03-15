var PostsView = Backbone.View.extend({

  tagName : 'ul',

  initialize : function() {
    this.listenTo(this.collection, 'reset', this.render);

    this.collection.on('destroy', this.removeView, this);
  },

  render : function() {
    this.removeView();
    this.collection.each(function(Post) {
      var postItem = new postItemView({model : Post});
      this.$el.append(postItem.render().el);
    }, this);

    $(this.$el).appendTo('#post-from-server');
    this.delegateEvents();
    return this;
  },

  removeView : function() {
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

    this.model.on('destroy', this.removeView, this);
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
  },

  removeView : function() {
    this.remove();
  }
});

var postLikeView = Backbone.View.extend({
  tagName : 'span',

  events : {
    'click .like-btn' : 'likePost'
  },

  initialize : function(options) {
    this.parent = options.parentView;

    this.model.on('change:like', function(){
      $(this.parent.find('.like-container')).empty();
      this.render();
    }, this);
  },

  likePost : function() {
    this.model.set({'likeState' : !this.model.get('likeState')});
  },

  template: _.template("<span class='like-btn'><%= like %></span>"),

  render : function() {
    this.parent.find('.like-container').append($(this.$el.html(this.template(this.model.toJSON()))));
    this.delegateEvents();
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
    this.model.trigger('deletePost');
  },

  template: _.template("<span class='delete-btn'>DELETE</span>"),

  render : function() {
    this.parent.find('.delete-container').append($(this.$el.html(this.template(this.model.toJSON()))));
    return this;
  }
});

