(function(){

	App.Collections.Posts = Parse.Collection.extend({

		model: App.Models.Post,

		comparator: function(x){
			return -x.get('createdAt');
		}

	});

}());