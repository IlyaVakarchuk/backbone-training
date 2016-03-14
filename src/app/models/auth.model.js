var AuthModel = Backbone.Model.extend({
  defaults : {
    action : 'registration'
  },

  initialize : function () {
    this.on('sync',function(model, res, options){
      console.log('Success sync!');
      postCollections.fetch({reset : true});
    });

    this.on('error', function(model, error, options) {
      console.log('event error');
      console.error('Error:', error);
    });
  },

  authUser : function(user) {
    this.save(user, {
      wait : true,
      url : 'http://localhost:3000/api/user'
    })
  }
});