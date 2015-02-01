(function(){

	// Initialize Collections
	App.posts = new App.Collections.Posts([
		{
			title: 'First Post',
			author: 'Richard',
			description: 'This is my first post. It is a test post.',
		},
		{
			title: 'Second Post',
			author: 'Taylor',
			description: 'This is Taylor\'s first post. It is written by Richard.',
		}
	]);

	// Initialize Router
	new App.Router.AppRouter();

}());