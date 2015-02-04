(function(){

	App.Models.Post = Parse.Object.extend({

		className: 'Post',

		idAttribute: 'objectId',

		defaults: {
			title: '',
			author: '',
			description: '',
			status: '',
			category: '',
			image: ''
		},

		initialize: function(){}

	});

}());