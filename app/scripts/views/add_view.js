(function(){

	App.Views.AddPost = Parse.View.extend({

		tagName: 'form',
		className: 'createForm',

		events: {
			'click #createPost': 'createPost'
		},

		template: _.template($('#addPost').html()),

		initialize: function(){
			this.render();
			$('#content').html(this.$el);
		},

		render: function(){

			$('#content').empty();

			this.$el.html(this.template());
		},

		createPost: function(e){
			e.preventDefault();

			var newPost = new App.Models.Post({
				title: $('#newTitle').val(),
				author: 'Richard Daniel',
				description: $('#newTextContent').val(),
				date_added: new Date(),
			});

			newPost.save(null, {
				success: function(){
					console.log("Post created");
					App.posts.add(newPost);
					App.router.navigate('', { trigger: true });
				},
				error: function(){
					console.log("Save failed");
				}
			});
		}

	});

}());