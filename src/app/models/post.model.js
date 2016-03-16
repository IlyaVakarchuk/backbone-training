var PostModel = Backbone.Model.extend({
  defaults : {
    id : 0,
    title : '',
    description : '',
    like : 0,
    likeState : 0,
  },

  initialize : function () {
    this.on('sync',function(model, res, options){

      switch (res.action) {
        case 'like' :
          if (this.get('likeState')) {
            this.set({'like' : this.get('like') + 1});
          } else {
            this.set({'like' : this.get('like') - 1});
          }
          break;
        default:
          break
      }
    });

    this.on('error', function(model, error, options) {
      console.error('Error:', error);
    });

    this.on('setLike', this.likePost);

    this.on('deletePost', this.deletePost)
  },

  likePost : function() {
    this.save({
        email : localStorage.getItem('userEmail')
    });
  },

  deletePost : function() {
    this.destroy();
  }

});