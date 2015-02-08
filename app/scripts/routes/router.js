(function(){

	App.Routers.AppRouter = Parse.Router.extend({

		initialize: function(){
			Parse.history.start();
		},

		routes: {
			'': 'home',
			'login': 'login',
			'addPost': 'addPost',
			'editPost/:id': 'editPost',
			'single/:id': 'singlePost',
			'done': 'done',
			'complete/:id': 'complete'
		},

		home: function(){
			new App.Views.Home();
		},

		login: function(){
			new App.Views.Login();
		},

		addPost: function(){
			if(App.user){
				new App.Views.AddPost();
			} else {
				console.log(App);
				App.router.navigate('#/login', { trigger: true });
				alert('Please Log In');
			}
		},

		editPost: function(id){
			if(App.user){
				var post = App.posts.get(id);
				new App.Views.EditPost(post);
			} else {
				console.log(App);
				App.router.navigate('#/login', { trigger: true });
				alert('Please Log In');
			}
		},

		singlePost: function(id){
			var post = App.posts.get(id);
			new App.Views.SingleView(post);
		},

		done: function(){
			if(App.user){
				new App.Views.Done();
			} else {
				console.log(App);
				App.router.navigate('#/login', { trigger: true });
				alert('Please Log In');
			}
		},

		complete: function(id){
			var post = App.posts.get(id);
			new App.Views.Complete(post);
		}

	});

}());