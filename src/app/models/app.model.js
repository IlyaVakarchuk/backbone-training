var AppModel = Backbone.Model.extend({
  defaults : {
    loginSate : false,
    rootUser : false,

    access : {
      auth : true,
      post : false
    }
  },
  initialize : function() {
    console.log('model Init!')
  }
});



