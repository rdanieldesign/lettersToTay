(function(){

	App.Router.AppRouter = Parse.Router.extend({

		initialize: function(){
			Parse.history.start();
		},

		routes: {
			'': 'showHome',
			'login': 'login',
			'addPost': 'addPost',
			'editPost/:id': 'editPost',
			'single/:id': 'singlePost'
		},

		showHome: function(){
			if(App.user){
				new App.Views.Home();
			} else {
				console.log(App);
				App.router.navigate('#/login', { trigger: true });
				alert('Please Log In');
			}
		},

		login: function(){
			new App.Views.Login();
		},

		addPost: function(){
			new App.Views.AddPost();
		},

		editPost: function(id){
			var post = App.posts.get(id);
			new App.Views.EditPost(post);
		},

		singlePost: function(id){
			var post = App.posts.get(id);
			new App.Views.SingleView(post);
		}

	});

}());