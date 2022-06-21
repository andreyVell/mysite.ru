<?php    
    require __DIR__."/../database/connect.php";
    if (isset($_COOKIE['newUser']) && !empty($_COOKIE['newUser']))
        $login=$_COOKIE['newUser'];  
    $sqlResult= $mysql->query("
    SELECT
        staff.role
    FROM `staff` 	
        WHERE staff.login='$login'");    
    $users = $sqlResult->fetch_array();
    $currentRole=$users['role'];
    die(json_encode($currentRole, JSON_UNESCAPED_UNICODE));    
?>