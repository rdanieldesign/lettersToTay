(function(){

	App.Views.EditPost = Parse.View.extend({

		events: {
			'click #submitEdit': 'edit'
		},

		template: '',

		initialize: function(options){
			this.options = options;
			var self = this;
			var url = window.location.href;
			$.get(url + 'templates/editPost.html', function(data){
				self.template = Handlebars.compile($(data).html());
				self.render();
			});
		},

		render: function(){

			$('#content').empty();
			var post = this.template(this.options.toJSON());
			this.$el.html(post);
			$('#content').html(this.$el);
		},

		edit: function(e){
			e.preventDefault();

			var editedPost = this.options;

			editedPost.set({
				title: $('#newTitle').val(),
				description: $('#newTextContent').val(),
			});

			editedPost.save(null, {
				success: function(){
					App.router.navigate('', { trigger: true });
				},
				error: function(){
					console.log("Edit failed");
				}
			});

		}

	});

}());