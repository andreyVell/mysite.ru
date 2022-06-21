<?php    
    require "connect.php";
    if (isset($_COOKIE['newUser']) && !empty($_COOKIE['newUser']))
        $login=$_COOKIE['newUser'];
    $sqlResult = $mysql->query("SELECT * FROM `Staff` WHERE `login`='$login'");
    $mysql->close();
    $users = $sqlResult->fetch_array();
    $currentRole = $users['role'];
?>