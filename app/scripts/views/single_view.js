(function(){

	App.Views.SingleView = Parse.View.extend({

		template: Handlebars.compile($('#singlePost').html()),

		initialize: function(options){
			this.options = options;
			this.render();
		},

		render: function(){
			$('#content').empty();
			var single = this.template(this.options.toJSON());
			$('#content').html(single);
		}

	})

}());