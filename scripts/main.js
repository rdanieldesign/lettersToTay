(function(){

	App.Models.Post = Parse.Object.extend({

		className: 'Post',

		idAttribute: 'objectId',

		defaults: {
			title: '',
			author: '',
			description: '',
			status: '',
			category: '',
			completed: {}
		},

		initialize: function(){}

	});

}());
(function(){

	App.Collections.Posts = Parse.Collection.extend({

		model: App.Models.Post,

		comparator: function(x){
			return -x.get('createdAt');
		}

	});

}());
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
			var self = this;

			this.render();
			$('#content').html(this.$el);

			$('#category').on('change', function(){
				self.filter();
			});

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
		},

		filter: function(){
			var catSel = $('#category option:selected').val();
			var self = this;
			var posts = App.posts.toJSON();
			this.$el.empty();
			if(catSel === "all"){
				var incPosts = _.where(posts, {status: 'incomplete'});
				_.each(incPosts, function(x){
					var post = self.template(x);
					self.$el.append(post);
				});
			} else {
				var filtered = _.where(posts, {status: 'incomplete', category: catSel});
				_.each(filtered, function(x){
					var post = self.template(x);
					self.$el.append(post);
				});
			};
		}

	});

}());
(function(){

	App.Views.Login = Parse.View.extend({

		tagName: 'form',
		className: 'loginForm',

		events: {
			'click #submitLogin': 'login',
			'click #logout': 'logout'
		},

		template: _.template($('#login').html()),

		initialize: function(){
			this.render();
			$('#content').html(this.$el);
		},

		render: function(){
			$('#content').empty();
			this.$el.html(this.template());
		},

		login: function(e){
			e.preventDefault();
			var un = $('#username').val();
			var pw = $('#password').val();
			Parse.User.logIn(un, pw, {
				success: function(){
					console.log('Login successful');
					App.user = Parse.User.current();
					App.router.navigate('', { trigger: true });
				},
				error: function(){
					console.log('Login error');
				}
			});
		},

		logout: function(e){
			e.preventDefault();
			Parse.User.logOut();
			App.user = Parse.User.current();
			console.log('Logged Out');
		}

	});

}());
(function(){

	App.Views.SingleView = Parse.View.extend({

		template: _.template($('#singlePost').html()),

		initialize: function(options){
			this.options = options;
			this.render();
		},

		render: function(){

			$('#content').empty();

			var single = this.template(this.options.toJSON());

			$('#content').html(single);

		}

	})

}());
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
(function(){

	App.Views.EditPost = Parse.View.extend({


		events: {
			'click #submitEdit': 'edit'
		},

		template: _.template($('#editPost').html()),

		initialize: function(options){
			this.options = options;
			this.render();
			$('#content').html(this.$el);
		},

		render: function(){

			$('#content').empty();

			var post = this.template(this.options.toJSON());
			this.$el.html(post);
		},

		edit: function(e){
			e.preventDefault();

			var editedPost = this.options;

			editedPost.set({
				title: $('#newTitle').val(),
				description: $('#newTextContent').val(),
			});

			editedPost.save(null, {
				success: function(){
					console.log("Post edited");
					App.router.navigate('', { trigger: true });
				},
				error: function(){
					console.log("Edit failed");
				}
			});

		}

	});

}());
(function(){

	App.Views.Done = Parse.View.extend({

		tagName: 'ul',
		className: 'postList',

		events: {
			'click #delete': 'delete',
			'click #incomplete': 'incomplete',
			'click #changeImage': 'changeImage'
		},

		template: _.template($('#donePosts').html()),

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
			console.log(e);
			App.posts.get(postId).set('status','incomplete').save();
		},

		changeImage: function(e){
			var postId = $(e.target.parentElement.parentElement).attr('id');
			App.router.navigate('#/complete/'+ postId, { trigger: true });
		}

	});

}());
(function(){

	App.Views.Complete = Parse.View.extend({

		tagName: 'form',
		className: 'completeForm',

		events: {
			'click #markComplete': 'complete'
		},

		template: _.template($('#complete').html()),

		initialize: function(options){
			this.options = options;
			this.render();
			$('#content').html(this.$el);
		},

		render: function(){
			$('#content').empty();
			var form = this.template(this.options.toJSON());
			this.$el.html(form);
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
(function(){

	App.Router.AppRouter = Parse.Router.extend({

		initialize: function(){
			Parse.history.start();
		},

		routes: {
			'': 'home',
			'login': 'login',
			'addPost': 'addPost',
			'editPost/:id': 'editPost',
			'single/:id': 'singlePost',
			'done': 'done',
			'complete/:id': 'complete'
		},

		home: function(){
			if(App.user){
				new App.Views.Home();
			} else {
				console.log(App);
				App.router.navigate('#/login', { trigger: true });
				alert('Please Log In');
			}
		},

		login: function(){
			new App.Views.Login();
		},

		addPost: function(){
			new App.Views.AddPost();
		},

		editPost: function(id){
			var post = App.posts.get(id);
			new App.Views.EditPost(post);
		},

		singlePost: function(id){
			var post = App.posts.get(id);
			new App.Views.SingleView(post);
		},

		done: function(){
			new App.Views.Done();
		},

		complete: function(id){
			var post = App.posts.get(id);
			new App.Views.Complete(post);
		}

	});

}());
Parse.initialize("lToYBQZdcL2qM76Z6EI6sLxjKRJIudczI1HqKdlA", "KHbrxno4ItzQwSTMhTxWVr26Nne6n8KMA6WLsUeu");

(function(){

	// Initialize User
	App.user = Parse.User.current();

	// Initialize Collections
	App.posts = new App.Collections.Posts();

	// Fetch Posts and Start App
	App.posts.fetch({
		success: function(){
			// Initialize Router
			App.router = new App.Router.AppRouter();
		},
		error: function(){
			console.log('Posts could not be fetched');
		}
	});

}());