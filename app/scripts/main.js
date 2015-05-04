Parse.initialize("lToYBQZdcL2qM76Z6EI6sLxjKRJIudczI1HqKdlA", "KHbrxno4ItzQwSTMhTxWVr26Nne6n8KMA6WLsUeu");

(function(){

	// Get Base URL
	App.base = window.location.origin + window.location.pathname;

	// Initialize User
	App.user = Parse.User.current();

	// Initialize Collections
	App.posts = new App.Collections.Posts();

	// Fetch Posts and Start App
	App.posts.fetch({
		success: function(){
			// Initialize Router
			App.router = new App.Routers.AppRouter();
		},
		error: function(){
			console.log('Posts could not be fetched');
		}
	});


	// Hanldebars helpers

	Handlebars.registerHelper('timestamp', function(time){
		return moment(time).format('MMMM Do, YYYY');
	});

}());