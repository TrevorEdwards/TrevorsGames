<?php

$host="localhost"; // Host name 

$username="www"; // Mysql username 

$password="thisisagoodpasswordreally"; // Mysql password 

$db_name="www"; // Database name 

$tbl_name="guestbook"; // Table name 



// Connect to server and select database.

mysql_connect("$host", "$username", "$password")or die("cannot connect server "); 

mysql_select_db("$db_name")or die("cannot select DB");



$datetime=date("m-d-y h:i:s"); //date time

$name = $_POST['name'];
$email = $_POST['email'];
$comment = $_POST['comment'];



$sql="INSERT INTO $tbl_name(name, email, comment, datetime)VALUES('$name', '$email', '$comment', '$datetime')";

$result=mysql_query($sql);



//check if query successful 

if($result){

echo "Successful";

echo "<BR>";

echo "Ok idiot, here is the message you left:";

echo "<BR>";

echo $_POST['comment'];

echo "<BR>";

// link to view guestbook page

echo "<a href='viewguestbook.php'>View guestbook</a>";

}



else {

echo "ERROR";

}

mysql_close();

?>
