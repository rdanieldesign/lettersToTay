(function(){

	App.Views.Done = Parse.View.extend({

		tagName: 'ul',
		className: 'postList',

		template: _.template($('#donePosts').html()),

		initialize: function(){

			this.render();

			$('#content').html(this.$el);

			App.posts.on('change', this.render, this);

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

		}

	});

}());