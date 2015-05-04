(function(){

	App.Views.Complete = Parse.View.extend({

		events: {
			'click #markComplete': 'complete',
			'change #cameraUpload': 'addImage'
		},

		template: '',

		initialize: function(options){
			this.options = options;
			var self = this;
			$.get(App.base + 'templates/complete.html', function(data){
				var temp = $(data).html();
				self.template = Handlebars.compile(temp);
				self.render();
			});
		},

		render: function(){
			this.$el.empty();
			$('#content').empty();
			var form = this.template(this.options.toJSON());
			$('#content').html(form);
		},

		uploadedImage: "",

		addImage: function(){
			var self = this;
			// Image Upload to Parse
			var upload = $('#cameraUpload')[0];
			if(upload.files.length > 0){
				var file = upload.files[0];
				var name = 'image.jpg';
				var parseFile = new Parse.File(name, file);
				parseFile.save({
					success: function(){
						self.uploadedImage = parseFile;
						$('#newImage').attr('src', parseFile._url);
					},
					error: function(){
						alert('Failed to add image');
					}
				});
			}
		},

		complete: function(e){
			e.preventDefault();
			var post = this.options;
			var self = this;

			// Image Upload to Parse
			var upload = $('#cameraUpload')[0];
			if(self.uploadedImage !== ""){
				App.posts.get(post.id).set({
					'status': 'done',
					'image': self.uploadedImage,
				}).save(null, {
					success: function(){
						console.log('Post Saved!');
						App.router.navigate('#/done', { trigger: true });
					},
					error: function(){
						console.log('Failed to save with image');
					}
				});
			} else {
				App.posts.get(post.id).set({
					'status': 'done',
				}).save(null, {
					success: function(){
						App.router.navigate('#/done', { trigger: true });
					},
					error: function(){
						console.log('Failed to complete');
					}
				});
			}
		}

	});

}());