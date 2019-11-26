var blog = [];

var ajaxReq = new AjaxRequest();

function loadBlog(){
    debugger;
    document.getElementById('blog').innerHTML = "<img src='wait.gif' alt='Loading'/>"
    ajaxReq.send("GET", "blog.xml", handleRequest);
}

function handleRequest() {
    debugger;
    if (ajaxReq.getReadyState() === 4 && ajaxReq.getStatus() === 200) {
        var xmlData = ajaxReq.getResponseXML().getElementsByTagName('blog')[0];
        Blog.prototype.signature = 'by' + getText(xmlData.getElementsByTagName('author')[0]);
        var entries = xmlData.getElementsByTagName('entry')
        for (var i = 0; i < entries.length; i++) {
            blog.push(new Blog(getText(entries[i].getElementsByTagName('body')[0]),
                getText(entries[i].getElementsByTagName('date')[0]),
                getText(entries[i].getElementsByTagName('img')[0]),
            ));
        }
        showText(2);
        document.getElementById('button1').disabled = false;
        document.getElementById('button2').disabled = false;
        document.getElementById('button3').disabled = false;
    }
}

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

//xml feldolgozása
function getText(elem){
    var text = "";
    if(elem){
        if(elem.childNodes){
            for(i = 0; i < elem.childNodes.length; i++){
                var child = elem.childNodes[i];
                if(child.nodeValue){
                    text += child.nodeValue;
                }
                else{
                    if(child.childNodes){
                        if(child.childNodes[0].nodeValue){
                            text += child.childNodes[0].nodeValue;
                        }
                    }
                }
            }
        }
    }
    return text;
}



