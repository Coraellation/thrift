Template.postItem.helpers({
	domain: function(){
		var a = document.createElement('a'); //a is an empty anchor , since it has a special hostname property
		a.href = this.url; //{{@#each}} block helper not only iterates over our array, it also sets the value of 'this' inside the block to the iterated object
		return a.hostname; //gets back the domains's name wihtout the rest of the url ye 
	},

    postTime: function(){
        var date = new Date();
        return date;
    }
});