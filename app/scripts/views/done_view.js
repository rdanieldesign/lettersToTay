(function(){

	App.Views.Done = Parse.View.extend({

		tagName: 'ul',
		className: 'postList',

		events: {
			'click #delete': 'delete',
			'click #incomplete': 'incomplete',
			'click #changeImage': 'changeImage'
		},

		template: Handlebars.compile($('#donePosts').html()),

		initialize: function(){

			this.render();

			$('#content').html(this.$el);

			App.posts.on('change', this.render, this);
			App.posts.on('destroy', this.render, this);

		},

		render: function(){

			$('#content').empty();

			var self = this;
			var posts = App.posts.toJSON();
			var donePosts = _.where(posts, {status: 'done'});

			this.$el.empty();

			_.each(donePosts, function(x){
				var post = self.template(x);
				self.$el.append(post);
			});

		},

		delete: function(e){
			e.preventDefault();
			var postId = $(e.target.parentElement.parentElement).attr('id');
			var sure = confirm('Are you sure you want to delete this entry?');
			if(sure){
				App.posts.get(postId).destroy();
			};
		},

		incomplete: function(e){
			var postId = $(e.target.parentElement.parentElement).attr('id');
			App.posts.get(postId).set('status','incomplete').save();
		},

		changeImage: function(e){
			var postId = $(e.target.parentElement.parentElement).attr('id');
			App.router.navigate('#/complete/'+ postId, { trigger: true });
		}

	});

}());