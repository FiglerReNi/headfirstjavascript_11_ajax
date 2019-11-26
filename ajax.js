/*XMLHttpRequest
  - readyState: (numeric state of request)
                0 - uninitialized
                1 - open
                2 - sent
                3 - receiving
                4 - loaded
  - status: (Http status code of request)
            404 - not found
            200 - ok
  - onreadystatechange: (when a request state is changes)
  - abort(): (request cancel)
  - open(): (prepare request) 3 értéke van:
                                    1. tipus: GET vagy POST
                                    2. URL
                                    3. asynchronous: mindig true (ennek segítségével történik a háttérben minden és nem frissül az egész oldal)
  - send(): (send request)
  -responseText and responseXML: (stored returned data)
 */
//1. XMLHttpRequest object létrehozása (böngészőnén eltérő lehet, ezért a sok try-catch)
// var request = null;
// if(window.XMLHttpRequest){
//     try{
//         request = new XMLHttpRequest();
//     }
//     catch (e) {
//         request = null;
//     }
// } else if(window.ActiveXObject){
//     try{
//         request = new ActiveXObject("Msxml2.XMLHTTP");
//     }
//     catch (e) {
//         try{
//             request = new ActiveXObject("Microsoft.XMLHTTP");
//         }
//         catch (e) {
//             request = null;
//         }
//     }
// }

//Egyszerűsítés miatt csinálunk egy objectet és az XMLHttpRequest object létrehozását belerakjuk a constructorba.
// Így ez mindig automatikus lesz, ha meghívjuk ezt a objectet.
function AjaxRequest(){
    if(window.XMLHttpRequest){
        try{
            this.request = new XMLHttpRequest();
        }
        catch (e) {
            this.request = null;
        }
    } else if(window.ActiveXObject){
        try{
            this.request = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e) {
            try{
                this.request = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (e) {
                this.request = null;
            }
        }
    }
}
//Methodok (az XMLHttpRequest object methodjait kapja meg)
AjaxRequest.prototype.getReadyState = function(){
    return this.request.readyState;
};
AjaxRequest.prototype.getStatus = function(){
    return this.request.status;
};
AjaxRequest.prototype.getResponseText = function(){
    return this.request.responseText;
};
AjaxRequest.prototype.getResponseXML = function(){
    return this.request.responseXML;
};
//postDataType és postData csak POST method esetén kell
AjaxRequest.prototype.send = function(type, url, handler, postDataType, postData) {
    if(this.request != null){
        this.request.abort();
    }
    url += "?dummy" + new Date().getTime();
    try{
        this.request.onreadystatechange = handler;
        this.request.open(type, url, true);
        if(type.toLowerCase() === "get"){
            this.request.send(null);
        }else{
            this.request.setRequestHeader("Content-Type", postDataType);
            this.request.send(postData);
        }
    }
    catch (e) {
        alert("Ajax error communicating with the server.\n" + "Details: " + e)
    }
};
// //Object létrehozása nélkül
// //2. request
// request.onreadystatechange = handler;
// //GET
// request.open("GET", "blog.xml", true);
// request.send(null);
// //POST
// request.open("POST", "addblogentry.php", true);
// request.send("09/26/2008&&These dreams just...&cubeapart.png");

