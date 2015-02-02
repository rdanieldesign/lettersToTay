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
			new App.Views.Home();
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