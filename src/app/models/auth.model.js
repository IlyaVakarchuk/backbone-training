define(['backbone',
  'materialize',
  'jquery',
  'underscore',
  'appModel'],
  function(Backbone, Materialize, $, _, myApp) {
    var AuthModel = Backbone.Model.extend({
      defaults : {
        action : 'auth',
        state : false,
        likes : [],
        email: ''
      },

      validate: function(attrs, options) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (attrs.action == 'auth') {
          if (!re.test(attrs.email)) {
            Materialize.toast('Incorrect email', 4000);
            return 'incorrect email';
          }

          if (!attrs.password.length) {
            Materialize.toast('Incorrect password', 4000);
            return 'incorrect password';
          }
        }
      },

      initialize : function () {
        this.on('sync',function(model, res){
          switch (res.action) {
            case 'auth' :
              if (res.notice == 'Success') {
                var arr = [];

                if (res.likes.length) {
                  arr = res.likes.split(',');
                }

                $.each(arr, function (index, el) {
                  arr[index] = parseInt(el)
                });
                this.set({likes: arr});
                this.set({state: true});
                localStorage.setItem('rootUser', res.root);
                localStorage.setItem('userEmail', res.email);
                appRoute.navigate('!/post', {trigger: true});
              } else {
                Materialize.toast(res.message, 4000)
              }
              break;
            case 'logout' :
              localStorage.removeItem('loginState');
              localStorage.removeItem('userEmail');
              localStorage.removeItem('rootUser');
              //appRoute.navigate('!/', {trigger: true});
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
        });
      },

      logout : function() {
        this.save({state : false, action: 'logout'}, {
          wait : true,
          url : 'http://localhost:3000/api/logout'
        })
      }
    });

    return AuthModel;
});
