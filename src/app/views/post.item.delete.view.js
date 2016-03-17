define(['backbone','underscore', 'jquery'], function(Backbone, _, $) {


  var deletePostView = Backbone.View.extend({
    tagName: 'span',

    events: {
      'click .delete-btn': 'deletePost'
    },

    initialize: function (options) {
      this.parent = options.parentView;
      this.model = options.model;
    },

    deletePost: function (e) {
      this.model.trigger('deletePost');
    },

    template: _.template($('#delete-post-view').html()),

    render: function () {
      this.parent.find('.delete-container').append($(this.$el.html(this.template(this.model.toJSON()))));
      return this;
    }
  });

  return deletePostView;

});