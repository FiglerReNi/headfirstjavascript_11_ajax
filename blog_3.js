//Ha egy properti vagy method azonos minden példány esetén, akkor a class-hoz kötjük és nem a konstruktorba írjuk bele,
// ehhez kell a prototype, így a példányok tudják hívni közvetlenül
//ha valamelyik argument nem kap értéket, akkor null lesz automatikusan, de a végén kell lennie ami opcionális,
//mert olyat nem lehet, hogy pl img nem adok meg, de utána date-et igen
function Blog(text, date, img) {
    this.text = text;
    this.date = new Date(date);
    this.img = img;
    //dátum formálás konstruktorba
    //this.dateForm = (this.date.getMonth()+1)+ "/" + this.date.getDate() + "/" + this.date.getFullYear();
}
    Blog.prototype.signature = 'Puzzler Ruby';
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

//Írhatunk olyan methodot is ami nem kötődik a példányokhoz, csak a classhoz, a példánnyal nem tudjuk meghívni, de a propertiket tudjuk használni
    Blog.showSignature = function(){
        alert(Blog.prototype.signature);
    };
    //Blog.showSignature();
    Blog.blogSorter = function(blog1, blog2){
        return blog2.date - blog1.date
    };

var blog = [
    new Blog("Got the new cube I ordered. It's a real pearl cube.", "08/14/2008"),
    new Blog("Solved the new cube but of course, now I'm bored and shopping for a new one.", "08/19/2008"),
    new Blog("Managed to get a headache toiling over the new cube. Gotta nap.", "08/16/2008", "cube777.png"),
    new Blog("Found a 7x7x7 cube for sale online. Yikes! That one could be a beast.", "08/21/2008")
];

//ha kap értéket csak annyi sort jelenít meg, ha nem kap akkor az összeset.
function showText(number){
    blog.sort(Blog.blogSorter);
    if(!number){
        number = blog.length;
    }
    var blogText = "";
    for(var i = 0; i < blog.length && i < number; i++){
        blogText += blog[i].toHTML(i === 0 || i % 2 === 0);
        document.getElementById('blog').innerHTML = blogText;
    }
}

function search(){
    var textSearch = document.getElementById('search').value;
    if(textSearch.length != "") {
        for (var i = 0; i < blog.length; i++) {
            var result = 0;
            //több találathoz egy bejegyzésen belül:  result = text.indexOf(search, result + 1);
            result = blog[i].containsText(textSearch);
            if (result != -1) {
                alert(blog[i].blogToString());
                break;
            }
        }
    }
    if(i == blog.length){
        alert('No match, sorry');
    }
}

function random(){
    var number = Math.floor(Math.random()*blog.length);
    alert(blog[number].blogToString());
}