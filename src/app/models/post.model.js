var PostModel = Backbone.Model.extend({
  defaults : {
    id : 0,
    title : '',
    description : '',
    like : 0
  },

  initialize : function () {
    this.on('sync',function(model, res, options){

      switch (res.action) {
        case 'like' :
          console.log('!')
          break;
        default:
          break
      }
    });

    this.on('error', function(model, error, options) {
      console.error('Error:', error);
    });
  },

  likePost : function() {
    console.log(this.get('id'));
    console.log(this.get('like'));
    this.save(this.get('id'), {
      wait : true,
      type: "PUT",
      path: true,
    })
  }
});