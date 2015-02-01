(function(){

	App.Views.Home = Parse.View.extend({

		tagName: 'ul',
		className: 'postList',

		events: {
			'click #delete': 'delete'
		},

		template: _.template($('#homePosts').html()),

		initialize: function(){
			this.render();
			$('#content').html(this.$el);

			App.posts.on('destroy', this.render, this);
		},

		render: function(){

			var self = this;
			var posts = App.posts.toJSON();

			this.$el.empty();

			_.each(posts, function(x){
				var post = self.template(x);
				self.$el.append(post);
			});
		},

		delete: function(e){
			e.preventDefault();
			var postId = $(e.target.parentElement).attr('id');
			App.posts.get(postId).destroy();
		}

	});

}());