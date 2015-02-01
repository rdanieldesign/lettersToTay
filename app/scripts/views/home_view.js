(function(){

	App.Views.Home = Backbone.View.extend({

		tagName: 'ul',
		className: 'postList',

		template: _.template($('#homePosts').html()),

		initialize: function(){
			console.log('Home View Initialized')

			this.render();
			$('#content').html(this.$el);
		},

		render: function(){

			console.log(App.posts);

			var self = this;
			var posts = App.posts.models;

			this.$el.empty();

			_.each(posts, function(x){
				var post = self.template(x.attributes);
				self.$el.append(post);
			});
		}

	});

}());