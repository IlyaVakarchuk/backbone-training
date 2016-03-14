var AuthModel = Backbone.Model.extend({
  defaults : {
    action : 'registration',
    state : 0
  },

  initialize : function () {
    this.on('sync',function(model, res, options){

      switch (res.action) {
        case 'auth' :
          this.set({state : 1});
          appRoute.navigate('!/post', {trigger: true});
          break;
        case 'logout' :
          console.log(this.get('a'))
          appRoute.navigate('!/', {trigger: true});
          break;
        default:
          break
      }
    });

    this.on('error', function(model, error, options) {
      console.error('Error:', error);
    });

    this.on('change:state', function(){
      myApp.set({loginSate : !(myApp.get('loginState'))});
    })
  },

  authUser : function(user) {
    this.save(user, {
      wait : true,
      url : 'http://localhost:3000/api/user'
    })
  },

  logout : function() {
    this.save({state : 0}, {
      wait : true,
      url : 'http://localhost:3000/api/logout'
    })
  }
});