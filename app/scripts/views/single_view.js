(function(){

	App.Views.SingleView = Parse.View.extend({

		template: _.template($('#singlePost').html()),

		initialize: function(options){
			this.options = options;
			this.render();
		},

		render: function(){

			$('#content').empty();

			var single = this.template(this.options);

			$('#content').html(single);

		}

	})

}());