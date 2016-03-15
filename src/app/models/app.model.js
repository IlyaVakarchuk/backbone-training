var AppModel = Backbone.Model.extend({
  defaults : {
    loginState : false,
    rootUser : false,

    access : {
      auth : true,
      post : false
    }
  },
  initialize : function() {
    if (localStorage.getItem('loginState') !== null) {
      this.set({loginState : true});
    }
  }
});



