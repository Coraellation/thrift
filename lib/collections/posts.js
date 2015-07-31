Posts = new Mongo.Collection('posts');

Meteor.methods({
    postInsert: function(postAttributes) {
        check(this.userId, String);
        check(postAttributes, {
            title: String,
            url: String
        });

        //if (Meteor.isServer) {
        //    postAttributes.title += " (server)";
        //    // wait for 5 seconds
        //    Meteor._sleepForMs(5000);
        //} else {
        //    postAttributes.title += " (client)";
        //}

        //if (Meteor.isClient){
        //    Meteor.startup(function () {
        //        setInterval(function () {
        //            Meteor.call("getServerTime", function (error, result){
        //                Session.set("time", result);
        //            });
        //        });
        //    });
        //
        //    Template.postItem.time = function (){
        //        return Session.get("time");
        //    };
        //}
        //
        //if (Meteor.isServer){
        //    Meteor.methods({
        //        getServerTime: function(){
        //            var _time = (new Date).toTimeString();
        //            return _time;
        //        }
        //    });
        //}



        var postWithSameLink = Posts.findOne({url: postAttributes.url});
        if (postWithSameLink) {
            return {
                postExists: true,
                _id: postWithSameLink._id
            }
        }

        var user = Meteor.user();
        var post = _.extend(postAttributes, {
            userId: user._id,
            author: user.username,
            submitted: new Date()
        });

        var postId = Posts.insert(post);
        var postTime = new Date();
        console.log(date);

        return {
            _id: postId
        };
    }
});


// makes sure userId is a String, and title + url are both Strings
// Meteor Method is a server-side function that is called client-side
    // by doing this, would use the current server time instead of the client's wishy-washy time