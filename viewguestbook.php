<style>
  @import url(../style.css);
</style>

<table width="400" border="0" align="center" cellpadding="3" cellspacing="0">

<tr>

<td><strong>View Guestbook | <a href="guestbook.php">Sign Guestbook</a> </strong></td>
<td><strong><a href="index.html">Return to main site</a></td>
</tr>

</table>

<br>



<?php



$host="localhost"; // Host name 

$username="www"; // Mysql username 

$password="thisisagoodpasswordreally"; // Mysql password 

$db_name="www"; // Database name 

$tbl_name="guestbook"; // Table name 



// Connect to server and select database.

mysql_connect("$host", "$username", "$password")or die("cannot connect server "); 

mysql_select_db("$db_name")or die("cannot select DB");

$sql="SELECT * FROM $tbl_name";

$result=mysql_query($sql);

while($rows=mysql_fetch_array($result)){

?>



<table width="400" border="0" align="center" cellpadding="0" cellspacing="1" bgcolor="#CCCCCC">

<tr>

<td><table width="400" border="0" cellpadding="3" cellspacing="1" bgcolor="#FFFFFF">

<tr>

<td width="117">Name</td>

<td width="14">:</td>

<td width="357"><? echo $rows['name']; ?></td>

</tr>

<tr>

<td valign="top">Comment</td>

<td valign="top">:</td>

<td><? echo $rows['comment']; ?></td>

</tr>

<tr>

<td valign="top">Date/Time </td>

<td valign="top">:</td>

<td><? echo $rows['datetime']; ?></td>

</tr>

</table></td>

</tr>

</table>



<?php

}

mysql_close(); //close database

?>
