(function(){

	App.Models.Post = Parse.Object.extend({

		className: 'Post',

		idAttribute: 'objectId',

		defaults: {
			title: '',
			author: '',
			description: '',
		},

		initialize: function(){}

	});

}());