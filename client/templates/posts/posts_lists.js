Template.postsList.helpers({
  posts: function(){
    return Posts.find({}, {sort: {submitted: -1}});

    //use find() instead of fetch() because find() returns a cursor, which is a reactive data source
    //use fetch() on the cursor to log its content, which transforms it into an array
    //meteor is smart enough to iterate over cursors without having to convert them into arrays
    //REACTIVITY!!!!!! as in if you just add a post in the browser console, it'll appear automatically, because this helper funct does that

    // submitted -1 indicates to post in descending order I believe
  }
});