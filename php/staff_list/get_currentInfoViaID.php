<?php    
    $curId = trim($_POST['id']);
    require __DIR__."/../database/connect.php";
    if (isset($_COOKIE['newUser']) && !empty($_COOKIE['newUser']))
        $login=$_COOKIE['newUser'];    
    $sqlResult= $mysql->query("
        SELECT * FROM `staff` 	
        WHERE staff.id='$curId'");    
    $curInfo = $sqlResult->fetch_array();
    die(json_encode($curInfo, JSON_UNESCAPED_UNICODE));    
?>