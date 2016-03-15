var AuthModel = Backbone.Model.extend({
  defaults : {
    action : 'registration',
    state : false
  },

  initialize : function () {
    this.on('sync',function(model, res, options){

      switch (res.action) {
        case 'auth' :
          this.set({state : true});
          appRoute.navigate('!/post', {trigger: true});
          break;
        case 'logout' :
          localStorage.removeItem('loginState');
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
      myApp.set({loginState : this.get('state')});
      localStorage.setItem('loginState', this.get('state'));
    })
  },

  authUser : function(user) {
    this.save(user, {
      wait : true,
      url : 'http://localhost:3000/api/user'
    })
  },

  logout : function() {
    this.save({state : false}, {
      wait : true,
      url : 'http://localhost:3000/api/logout'
    })
  }
});