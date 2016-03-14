var AuthModel = Backbone.Model.extend({
  defaults : {
    action : 'registration'
  },

  authUser : function(user) {
    this.save(user, {
      wait : true,
      url : 'http://localhost:3000/auth',
      success : function(model, res) {
        var msg = res.message;
        if (res.notice === 'Success') {
          console.log('OK!');
          postCollections.fetch({reset : true});
        } else {
          console.log('No')
        }
      },
      error : function(model, res) {
        console.log(model);
        console.log(res);
      }
    })
  }
});