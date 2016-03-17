define(['backbone','underscore', 'postModel'], function(Backbone, _, PostModel) {
  var PostCollection = Backbone.Collection.extend({
    model : PostModel,
    url: 'http://localhost:3000/api/post',

    initialize : function(opt) {
      self = this;
      this.authModel = opt.authModel;
      this.on('checkState', this.checkState)
    },

    checkState : function() {
      this.each(function(model) {
        if ($.inArray(parseInt( model.get('id')), self.authModel.get('likes')) != -1) {
          model.set({likeState : 1});
        }
      });
    }
  });

  return PostCollection;
});