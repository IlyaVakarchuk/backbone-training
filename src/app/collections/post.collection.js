define(['backbone','underscore', 'postModel', 'authModel'], function(Backbone, _, PostModel, authModel) {
  var PostCollection = Backbone.Collection.extend({
    model : PostModel,
    url: 'http://localhost:3000/api/post',

    initialize : function() {
      this.on('checkState', this.checkState)
    },

    checkState : function() {
      this.each(function(model) {
        if ($.inArray(parseInt( model.get('id')), authModel.get('likes')) != -1) {
          model.set({likeState : 1});
        }

      });
    }
  });

  return PostCollection;
});