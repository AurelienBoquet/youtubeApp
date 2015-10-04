angular.module('youtubeApp')
  .factory('connection', function (localStorage, socket, $q, $state) {

    var dataUser;

    return {

      setUser: function(user) {
        dataUser = user;
      },

      getUser: function() {
        return dataUser;
      },

      signin: function(user) {
        var deferred = $q.defer();

        socket.emit('signin', user);

        socket.on('signin', function(user) {

          if (user) {
            localStorage.set(user.token);
            socket.join(user._id);
            $state.go('main.home');
            deferred.resolve(user);
          } else {
            deferred.reject();
          }
        });

        return deferred.promise;
      },

      signup: function(user) {
        var deferred = $q.defer();

        socket.emit('signup', user);

        socket.on('signup', function(user) {

          if (user) {
            localStorage.set(user.token);
            $state.go('main.home');
            deferred.resolve(user);
          } else {
            deferred.reject();
          }
        });

        return deferred.promise;
      },

      logout: function() {

        localStorage.remove();
        socket.emit('logoutMobile');
        this.setUser(null);

        // promise
        var d = $q.defer();
        d.resolve();
        return d.promise;
      },

      isLoggedIn: function() {
        var deferred = $q.defer();
        var token = localStorage.get();
        var self = this;

        if (token) {
          socket.emit('isLoggedIn', token);
        } else {
          deferred.reject();
        }

        socket.on('loggedIn', function(user) {
          if ((user||{})._id) {
            self.setUser(user);
            socket.join(user._id);
            deferred.resolve(user);
          } else {
            deferred.reject();
          }
        });

        return deferred.promise;
      }

    };
  });
