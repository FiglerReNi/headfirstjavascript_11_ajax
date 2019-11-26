//Ha konstruktorba teszünk propertiket és methodokat, azok minden példányhoz külön legenerálódnak,
//ennek csak akkor van értelme, ha valami példányonként más, itt pl a szöveg és a dátum.
function Blog(text, date){
    this.text = text;
    this.date = new Date(date);
    this.containsText = function(textSearch){
        return this.text.toLowerCase().indexOf(textSearch.toLowerCase());
    };
    this.blogToString = function(){
        return (this.date.getMonth() + 1) + "/" + this.date.getDate() + "/" + this.date.getFullYear() + " - " + this.text
    };
    this.toHTML = function(feltetel){
        var blogText = "";
        blogText += feltetel ? "<p style='background-color:lightgrey'>" : "<p>";
        blogText += "<strong>" + (this.date.getMonth()+1)+ "/" + this.date.getDate() + "/" + this.date.getFullYear() + "</strong></br>";
        blogText += this.text + "</p></br>";
        return blogText;
    }
}

var blog = [
    new Blog("Got the new cube I ordered. It's a real pearl cube.", "08/14/2008"),
    new Blog("Solved the new cube but of course, now I'm bored and shopping for a new one.", "08/19/2008"),
    new Blog("Managed to get a headache toiling over the new cube. Gotta nap.", "08/16/2008"),
    new Blog("Found a 7x7x7 cube for sale online. Yikes! That one could be a beast.", "08/21/2008")
];

//ha kap értéket csak annyi sort jelenít meg, ha nem kap akkor az összeset.
function showText(number){
    debugger;
    blog.sort(function(blog1, blog2){return blog2.date - blog1.date});
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