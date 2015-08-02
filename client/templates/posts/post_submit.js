Template.postSubmit.events({

    'click #upload': function (e) {
        e.preventDefault();
        imageUrl = "https://www.filepicker.io/api/file/ds2EMKyOTLu0rmEwISNT";
        filepicker.pick(
            {
                mimetypes: ['image/gif','image/jpeg','image/png'],
                multiple: false
            },
            function(InkBlob){
                imageUrl = InkBlob.url;
                //var image = Images.findOne({userId:Meteor.userId()});
                //if(image){
                //    Images.update({_id:image._id},
                //        {
                //            $set:{
                //                filepickerId:_.last(InkBlob.url.split("/"))
                //            }
                //        });
                //}else{
                //    Images.insert({
                //        userId:Meteor.userId(),
                //        filepickerId:_.last(InkBlob.url.split("/")),
                //        createdAt:new Date()
                //    });
                //}
            },
            function(FPError){
                //if(FPError && FPError.code !== 101)
                //    alert(FPError.toString());
            }
        );
    },

    'submit form': function(e) {
        e.preventDefault();

        //if(!imageUrl){
        //    return alert("please upload an image");
        //} else {
        //    console.log(imageUrl);
        //}

        var post = {
            url: "https://www.filepicker.io/api/file/ds2EMKyOTLu0rmEwISNT",
            title: $(e.target).find('[name=title]').val()
            //time: $(e.target).find('[name=postTime]').val()
        };

        Meteor.call('postInsert', post, function(error, result) {
            // display the error to the user and abort
            if (error){
                console.log("this fucking sucks");
                return alert(error.reason);
            }

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
