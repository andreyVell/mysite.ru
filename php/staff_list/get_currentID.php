<?php    
    require __DIR__."/../database/connect.php";
    if (isset($_COOKIE['newUser']) && !empty($_COOKIE['newUser']))
        $login=$_COOKIE['newUser'];  
    $sqlResult= $mysql->query("
    SELECT
        staff.id
    FROM `staff` 	
        WHERE staff.login='$login'");    
    $users = $sqlResult->fetch_array();
    $currentId=$users['id'];
    die(json_encode($currentId, JSON_UNESCAPED_UNICODE));    
?>