(function(){

	App.Views.Login = Parse.View.extend({

		tagName: 'form',
		className: 'loginForm',

		events: {
			'click #submitLogin': 'login',
			'click #logout': 'logout'
		},

		template: '',

		initialize: function(){
			this.render();
			var self = this;
			$.get('/templates/login.html', function(data){
				self.template = Handlebars.compile($(data).html());
				self.render();
			});
		},

		render: function(){
			$('#content').empty();
			this.$el.html(this.template);
			$('#content').html(this.$el);
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