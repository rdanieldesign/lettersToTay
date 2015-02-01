(function(){

	App.Models.Post = Backbone.Model.extend({

		defaults: {
			title: '',
			author: '',
			description: '',
			date_added: new Date()
		},

		initialize: function(){
			console.log('Model Initialized');
		}

	});

}());