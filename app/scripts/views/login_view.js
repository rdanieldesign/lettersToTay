(function(){

	App.Views.Login = Parse.View.extend({

		tagName: 'form',
		className: 'loginForm',

		events: {
			'click #submitLogin': 'login'
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

		login: function(){
			var un = $('#username').val();
			var pw = $('#password').val();
			Parse.User.logIn(un, pw, {
				success: function(){
					console.log('Login successful');
				},
				error: function(){
					console.log('Login error');
				}
			});
		}

	});

}());