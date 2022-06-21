<?php    
    $deleteId = trim($_POST['id']);
    require __DIR__."/../database/connect.php";
    $sqlResult = $mysql->query("
        DELETE FROM `offices` WHERE offices.id='$deleteId'");    
    $mysql->close();   
    die(json_encode("Удалено!", JSON_UNESCAPED_UNICODE));
?>