Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { return Meteor.subscribe('posts'); }
});

Router.route('/', {name: 'postsList'});

Router.route('/posts/:_id', {
  name: 'postPage',
  data: function() { return Posts.findOne(this.params._id); }
});

Router.route('/submit', {name:'postSubmit'});

var requireLogin = function() {
	if (! Meteor.user()){
		if (Meteor.loggingIn()){
			this.render(this.loadingTemplate); //show loading screen while waiting to login
		} else {
			this.render('accessDenied');
		}
	} else {
		this.next();
	}
}

Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});



//':' makes id the PARAM
// 	tells any url with /posts/xyz to use this, and puts xyz in _id property like a variable
// 	name: 'postPage', //find the template called postPage
// 	data: function() { return Posts.findOne(this.param._id);} //accessing param _id from url
// 	//just the id param for findOne function is shorthand for {_id : id}
// });

// Router.onBeforeAction('dataNotFound', {only: 'postPage'});
//tells it to go to 'not found' page not just for invalid routes, but also for postPage route whenever data function returns a falsy (null, false, undefined empty object)