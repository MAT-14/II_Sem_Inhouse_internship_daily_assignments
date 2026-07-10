<?php
 include ("header.php");

 session_start();

 echo "Welcome, ", $_SESSION['user_name']. "!";
 ?>
 
 <a href="updatePassword.php">Update Password</a>

<?php
include("footer.php");
?>