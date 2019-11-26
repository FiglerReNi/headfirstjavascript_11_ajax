date1 = new Date("08/14/2008");
date2 = new Date("08/19/2008");

function getDaysBetween(date1, date2){
    var between = (date2-date1)/(1000*60*60*24);
    between = Math.round(between);
    alert(between);
}

getDaysBetween(date1, date2);