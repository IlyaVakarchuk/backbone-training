define(['backbone','underscore', 'jquery', 'postItemLikeView', 'postItemDeleteView'], function(Backbone, _, $, postItemLikeView, postItemDeleteView) {
  var postItemView = Backbone.View.extend({
    tagName: 'li',

    className: 'post-item',

    template: _.template($('#posts-view').html()),

    initialize: function (opt) {

      this.model = opt.model;

      _.bindAll(this, 'render');
      this.render();

      this.model.on('destroy', this.removeView, this);
    },

    deletePost: function () {

    },

    render: function () {
      $(this.$el.html(this.template(this.model.toJSON()))).appendTo('body');

      var likeItem = new postItemLikeView({model: this.model, parentView: this.$el});
      var deleteItem = new postItemDeleteView({model: this.model, parentView: this.$el});

      likeItem.render();

      if (localStorage.getItem('rootUser') != 'undefined' && localStorage.getItem('rootUser') != 0) {
        deleteItem.render();
      }

      return this;
    },

    removeView: function () {
      this.remove();
    }
  });

  return postItemView;
});