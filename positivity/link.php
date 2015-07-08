<?php
  $name = $_POST['name'];
  $url = "http://".$_SERVER["SERVER_NAME"]."/positivity/show.php?name=".$name;
  echo "Send the link below to your good friend.";
  echo "<br>";
  echo "<a href=".$url.">".$url."</a>";
?>
