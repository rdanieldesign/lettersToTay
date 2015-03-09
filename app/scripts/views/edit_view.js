(function(){

	App.Views.EditPost = Parse.View.extend({

		events: {
			'click #submitEdit': 'edit'
		},

		template: Handlebars.compile($('#editPost').html()),

		initialize: function(options){
			this.options = options;
			this.render();
			$('#content').html(this.$el);
		},

		render: function(){

			$('#content').empty();

			var post = this.template(this.options.toJSON());
			this.$el.html(post);
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
					console.log("Post edited");
					App.router.navigate('', { trigger: true });
				},
				error: function(){
					console.log("Edit failed");
				}
			});

		}

	});

}());