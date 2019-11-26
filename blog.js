function Blog(text, date){
    this.text = text;
    // this.date = date;
    this.date = new Date(date);
}

var blog = [
    new Blog("Got the new cube I ordered. It's a real pearl cube.", "08/14/2008"),
    new Blog("Solved the new cube but of course, now I'm bored and shopping for a new one.", "08/19/2008"),
    new Blog("Managed to get a headache toiling over the new cube. Gotta nap.", "08/16/2008"),
    new Blog("Found a 7x7x7 cube for sale online. Yikes! That one could be a beast.", "08/21/2008")
    ];

// var blog = [
//     new Blog("Got the new cube I ordered. It's a real pearl.", new Date("08/14/2008")),
//     new Blog("Solved the new cube but of course, now I'm bored and shopping for a new one.",  new Date("08/19/2008")),
//     new Blog("Managed to get a headache toiling over the new cube. Gotta nap.",  new Date("08/16/2008")),
//     new Blog("Found a 7x7x7 cube for sale online. Yikes! That one could be a beast.",  new Date("08/21/2008"))
//     ];

//Sorba rendezés
// var db = 0;
// for (var i = 0; i < blog.length - 1; i++)
// {
//     for (var j = blog.length - 1; j > i; j--)
//     {
//         if (blog[j].date > blog[j - 1].date)
//         {
//             db++;
//             x = blog[j];
//             blog[j] = blog[j - 1];
//             blog[j - 1] = x;
//         }
//     }
// }

//Sorba rendezés
//https://www.w3schools.com/jsref/jsref_sort.asp
blog.sort(function(blog1, blog2){return blog2.date - blog1.date});

//ha kap értéket csak annyi sort jelenít meg, ha nem kap akkor az összeset.
function showText(number){
    if(!number){
        number = blog.length;
    }
    var blogText = "";
    for(var i = 0; i < blog.length && i < number; i++){
        if(i === 0 || i % 2 === 0){
            blogText += "<p style='background-color:lightgrey'>";
        }
        else{
            blogText += "<p>";
        }
        blogText += "<strong>" + (blog[i].date.getMonth()+1)+ "/" + blog[i].date.getDate() + "/" + blog[i].date.getFullYear() + "</strong></br>";
        blogText += blog[i].text + "</p></br>";
        document.getElementById('blog').innerHTML = blogText;
    }
}

function search(){
    var textSearch = document.getElementById('search').value;
    for (var i = 0; i < blog.length ; i++){
        var result = 0;
        //több találathoz egy bejegyzésen belül:  result = text.indexOf(search, result + 1);
        result = blog[i].text.toLowerCase().indexOf(textSearch.toLowerCase());
        if(result != -1) {
            alert((blog[i].date.getMonth() + 1) + "/" + blog[i].date.getDate() + "/" + blog[i].date.getFullYear() +  " - " + blog[i].text);
            break;
        }
    }
    if(i == blog.length){
            alert('No match, sorry');
    }
}

function random(){
    var number = Math.floor(Math.random()*blog.length);
    alert(number);
    alert((blog[number].date.getMonth() + 1) + "/" + blog[number].date.getDate() + "/" + blog[number].date.getFullYear() +  " - " + blog[number].text);

}