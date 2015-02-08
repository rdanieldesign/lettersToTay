(function(){

	App.Views.Complete = Parse.View.extend({

		events: {
			'click #markComplete': 'complete'
		},

		template: _.template($('#complete').html()),

		initialize: function(options){
			this.options = options;
			this.render();
		},

		render: function(){
			$('#content').empty();
			var form = this.template(this.options.toJSON());
			$('#content').html(form);
		},

		complete: function(){
			var post = this.options;

			// Image Upload to Parse
			var upload = $('#cameraUpload')[0];
			if(upload.files.length > 0){
				var file = upload.files[0];
				var name = 'image.jpg';
				var parseFile = new Parse.File(name, file);
				parseFile.save({
					success: function(){
						App.posts.get(post.id).set({
							'status': 'done',
							'image': parseFile,
						}).save(null, {
							success: function(){
								App.router.navigate('#/done', { trigger: true });
							},
							error: function(){
								console.log('Failed to save with image');
							}
						});
					},
					error: function(){
						console.log('Image upload failed');
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
			};
		}

	});

}());