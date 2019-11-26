function Blog(text, date, img) {
    this.text = text;
    this.date = new Date(date);
    this.img = img;
}
Blog.prototype.containsText = function(textSearch){
    return this.text.toLowerCase().indexOf(textSearch.toLowerCase());
};
Blog.prototype.blogToString = function(){
    return this.date.shortFormat() + " - " + this.text
};
Blog.prototype.toHTML = function(feltetel){
    var blogText = "";
    blogText += feltetel ? "<p style='background-color:lightgrey'>" : "<p>";
    //dátum formálás konstruktorral
    //blogText += "<strong>" + this.dateForm + "</strong></br>";
    if(this.img){
        debugger;
        blogText += "<strong>" + this.date.shortFormat() + "</strong></br>";
        blogText += this.text + "</br>";
        blogText += "<img src= '" + this.img + "' alt='hibás kép' height='50' width='50'/></br>";
        blogText += "<em>" + this.signature + "</em></br></p>";
        return blogText;
    }
    else {
        blogText += "<strong>" + this.date.shortFormat() + "</strong></br>";
        blogText += this.text + "</br>";
        blogText += "<em>" + this.signature + "</em></br></p>";
        return blogText;
    }
};
//beépített objektumokat is bővíthetjük
Date.prototype.shortFormat = function(){
    return (this.getMonth()+1)+ "/" + this.getDate() + "/" + this.getFullYear();
};

Blog.blogSorter = function(blog1, blog2){
    return blog2.date - blog1.date
};