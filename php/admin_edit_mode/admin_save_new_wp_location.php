<?php       
    $id_curr =trim($_POST['id']);   
    $top_curr =trim($_POST['top']);  
    $left_curr =trim($_POST['left']);     
    require __DIR__."/../database/connect.php";    
    try 
    {            
        $mysql->query("UPDATE `workplaces` SET workplaces.top_pos = '$top_curr', workplaces.left_pos = '$left_curr' WHERE workplaces.id = '$id_curr'");
        $mysql->close();    
        die(json_encode("Сохранено!", JSON_UNESCAPED_UNICODE));
    } 
    catch (Throwable $th) 
    {        
        //ошибка об неправильности чего-либо
        die(json_encode("Ошибка!", JSON_UNESCAPED_UNICODE));
    }
    
?>