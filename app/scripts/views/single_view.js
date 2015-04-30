(function(){

	App.Views.SingleView = Parse.View.extend({

		template: '',

		initialize: function(options){
			this.options = options;
			var self = this;
			$.get('../../templates/single.html', function(data){
				self.template = Handlebars.compile($(data).html());
				self.render();
			});
		},

		render: function(){
			$('#content').empty();
			var single = this.template(this.options.toJSON());
			$('#content').html(single);
		}

	})

}());