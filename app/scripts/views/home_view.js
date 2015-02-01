(function(){

	App.Views.Home = Parse.View.extend({

		tagName: 'ul',
		className: 'postList',

		template: _.template($('#homePosts').html()),

		initialize: function(){
			this.render();
			$('#content').html(this.$el);
		},

		render: function(){

			var self = this;
			var posts = App.posts.toJSON();

			this.$el.empty();

			_.each(posts, function(x){
				var post = self.template(x);
				self.$el.append(post);
			});
		}

	});

}());