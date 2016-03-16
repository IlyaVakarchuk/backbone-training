define(['backbone', 'underscore'], function(Backbone, _) {
  var AppModel = Backbone.Model.extend({
    defaults : {
      loginState : false,
      rootUser : false,
    },
    initialize : function() {
      if (localStorage.getItem('loginState') !== null) {
        this.set({loginState : true});
      }
    }
  });

  return AppModel;
});



