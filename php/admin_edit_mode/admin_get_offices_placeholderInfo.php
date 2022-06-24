<?php    
  
    $curId = trim($_POST['id']);
    require __DIR__."/../database/connect.php";        
    $sqlResult= $mysql->query("
        SELECT * FROM `offices` 	
        WHERE offices.id='$curId'");    
    $curInfo = $sqlResult->fetch_array();
    die(json_encode($curInfo, JSON_UNESCAPED_UNICODE));    
?>