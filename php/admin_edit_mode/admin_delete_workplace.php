<?php    
    $deleteId = trim($_POST['id']);
    require __DIR__."/../database/connect.php";
    $sqlResult = $mysql->query("
    UPDATE `workplaces` SET workplaces.IsDeleted = 1 WHERE workplaces.id='$deleteId'");    
    $mysql->close();   
    die(json_encode("Удалено!", JSON_UNESCAPED_UNICODE));
?>