Template.postSubmit.events({
    'submit form': function(e) {
        e.preventDefault();

        var post = {
            url: $(e.target).find('[name=url]').val(),
            title: $(e.target).find('[name=title]').val(),
            time: $(e.target).find('[name=postTime]').val()
        };

        Meteor.call('postInsert', post, function(error, result) {
            // display the error to the user and abort
            if (error)
                return alert(error.reason);

            // show this result but route anyway
            if (result.postExists)
                alert('This link has already been posted');

            Router.go('postPage', {_id: result._id});
        });
    }
});

/*
preventDefault on event makes sure browser doesn't go ahead and try to submit the form
insert function returns generated _id for object that's been inserted into db
which go function uses to create new url for us to browse to

Meteor method callbacks always have 2 arguments, error and result
if error arg exists, alerts the user, else everything else should go as planned

Router.go() is inside the method call's callback,
meaning form is waiting for method to succeed before redirecting
- to demonstrate the Meteor method client parrallely simulating while happening on the server,
    take out Router.go blablbah, and then put in Router.go('postsList') outside the callback method
    and += " (server)" or client to the post.js
*/
