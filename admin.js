var ajaxReq = new AjaxRequest();

function addBolgEntry(){
    document.getElementById('button').disabled = true;
    document.getElementById('status').innerHTML = 'Adding...';
    var date = document.getElementById('date').value;
    var body = document.getElementById('text').value;
    var img = document.getElementById('img').value;
    ajaxReq.send("POST", "addblogentry.php", handleRequest, "application/x-www-form-urlencoded; charset=UTF-8",
       "date="+date+"&body="+body+"&image="+img );
}

function handleRequest() {
    if (ajaxReq.getReadyState() === 4 && ajaxReq.getStatus() === 200) {
        document.getElementById('button').disabled = false;
        document.getElementById('status').innerHTML = "";
        alert('The new blog entry was succesfully added! ');
    }
}

function dateAdd(){
    document.getElementById('date').value = new Date().shortFormat();
    document.getElementById('text').focus();


}