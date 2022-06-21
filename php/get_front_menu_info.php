<?php    
    require __DIR__."/database/connect.php";
    if (isset($_COOKIE['newUser']) && !empty($_COOKIE['newUser']))
        $login=$_COOKIE['newUser'];
    $sqlResult = $mysql->query("SELECT * FROM `Staff` WHERE `login`='$login'");
    $mysql->close();
    $users = $sqlResult->fetch_array();
    $front_name = $users['last_name']." ".substr($users['first_name'],0,2).".";
    $front_avatar=$users['image'];
?>