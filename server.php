<?php
$fname = $_POST['fname'];
$lname = $_POST['lname'];
echo "Hello, " . htmlspecialchars($fname) . " " . htmlspecialchars($lname) . "! (Response from server)";
?>
