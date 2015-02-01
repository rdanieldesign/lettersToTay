(function(){

	App.Router.AppRouter = Backbone.Router.extend({

		initialize: function(){
			Backbone.history.start();
			console.log('Router Initialized');
		},

		routes: {
			'': 'showHome'
		},

		showHome: function(){
			new App.Views.Home();
		}

	});

}());