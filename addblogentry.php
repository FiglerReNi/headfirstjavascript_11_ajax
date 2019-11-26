<?php
$date = $_REQUEST['date'];
$body = stripslashes($_REQUEST['body']);
$img = $_REQUEST['image'];

$filename = "blog.xml";

//ellenőrizzük, hogy létezik-e a fájl
if(file_exists($filename)){
    $rowBlog = file_get_contents($filename);   //xml-ből string
}
else{
    //stringként hozzuk létre
    $rowBlog = "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>";
    $rowBlog .= "<blog><title>YouCube - The Blog for Cube Puzzlers</title>";
    $rowBlog .= "<author>Puzzler Ruby</author><entries></entries></blog>";
}

//Dom szerű szerkezetűvé konvertáljuk a megnyitott, vagy most létrehozott fájlt
$xml = new simpleXmlElement($rowBlog);

//Hozzáadjuk az új elemet
$entry = $xml->entries->addChild('entry');
$entry->addChild('body', $body);
$entry->addChild('date', $date);
$entry->addChild('img', $img);

//elmentjük
$file = fopen($filename, w);
fwrite($file, $xml->asXML());
fclose($file);

