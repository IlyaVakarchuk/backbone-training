define(['backbone','underscore', 'jquery'], function(Backbone, _, $) {

  var postLikeView = Backbone.View.extend({
    tagName: 'span',

    events: {
      'click .like-btn': 'likePost'
    },

    initialize: function (options) {
      this.parent = options.parentView;
      this.model = options.model;

      this.model.on('change:like', function () {
        $(this.parent.find('.like-container')).empty();
        this.render();

      }, this);
    },

    likePost: function () {
      this.model.set({'likeState': !this.model.get('likeState')});
      this.model.trigger('setLike');
    },

    template: _.template($("#like-post-view").html()),

    render: function () {

      this.parent.find('.like-container').append($(this.$el.html(this.template(this.model.toJSON()))));
      if (this.model.get('likeState')) {
        $(this.parent.find('.like-container i')).addClass('like');
      }
      this.delegateEvents();
      return this;
    }
  });

  return postLikeView;

});
