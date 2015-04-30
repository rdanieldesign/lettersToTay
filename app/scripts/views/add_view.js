(function(){

	App.Views.AddPost = Parse.View.extend({

		tagName: 'form',
		className: 'createForm',

		events: {
			'click #createPost': 'createPost'
		},

		template: '',

		initialize: function(){
			var self = this;
			$.get('../../templates/addPost.html', function(data){
				self.template = Handlebars.compile($(data).html());
				self.render();
			});
		},

		render: function(){
			$('#content').empty();
			this.$el.html(this.template);
			$('#content').html(this.$el);
		},

		createPost: function(e){
			e.preventDefault();

			var newPost = new App.Models.Post({
				title: $('#newTitle').val(),
				author: 'Richard Daniel',
				description: $('#newTextContent').val(),
				category: $('#addCategory option:selected').val(),
				status: 'incomplete'
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