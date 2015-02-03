(function(){

	App.Views.Home = Parse.View.extend({

		tagName: 'ul',
		className: 'postList',

		events: {
			'click #delete': 'delete',
			'click #complete': 'complete'
		},

		template: _.template($('#homePosts').html()),

		initialize: function(){
			this.render();
			$('#content').html(this.$el);

			App.posts.on('change', this.render, this);
			App.posts.on('destroy', this.render, this);
		},

		render: function(){

			var self = this;
			var posts = App.posts.toJSON();
			var incPosts = _.where(posts, {status: 'incomplete'});

			this.$el.empty();

			_.each(incPosts, function(x){
				var post = self.template(x);
				self.$el.append(post);
			});
		},

		delete: function(e){
			e.preventDefault();
			var postId = $(e.target.parentElement).attr('id');
			var sure = confirm('Are you sure you want to delete this entry?');
			if(sure){
				App.posts.get(postId).destroy();
			};
		},

		complete: function(e){
			var postId = $(e.target.parentElement).attr('id');
			App.router.navigate('#/complete/' + postId, { trigger: true });
		}

	});

}());