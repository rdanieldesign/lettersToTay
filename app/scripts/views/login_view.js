(function(){

	App.Views.Login = Parse.View.extend({

		tagName: 'form',
		className: 'loginForm',

		events: {
			'click #submitLogin': 'login',
			'click #logout': 'logout'
		},

		template: _.template($('#login').html()),

		initialize: function(){
			this.render();
			$('#content').html(this.$el);
		},

		render: function(){
			$('#content').empty();
			this.$el.html(this.template());
		},

		login: function(e){
			e.preventDefault();
			var un = $('#username').val();
			var pw = $('#password').val();
			Parse.User.logIn(un, pw, {
				success: function(){
					console.log('Login successful');
					App.user = Parse.User.current();
					App.router.navigate('', { trigger: true });
				},
				error: function(){
					console.log('Login error');
				}
			});
		},

		logout: function(e){
			e.preventDefault();
			Parse.User.logOut();
			App.user = Parse.User.current();
			console.log('Logged Out');
		}

	});

}());