<?php   

    
    $id_curr =trim($_POST['id']);   
    $floor_new = trim($_POST['floor']);
    $number_new =  trim($_POST['number']);
    
    require __DIR__."/../database/connect.php";    
    try 
    {   
        //изменяем значения если они не пустые
        if ($floor_new!='')
            $mysql->query("UPDATE `offices` SET offices.floor = '$floor_new' WHERE offices.id = '$id_curr'");

        if ($number_new!='')
            $mysql->query("UPDATE `offices` SET offices.number = '$number_new' WHERE offices.id = '$id_curr'");
    } 
    catch (Throwable $th) 
    {        
        //ошибка об неправильности чего-либо
        die(json_encode("Ошибка!", JSON_UNESCAPED_UNICODE));
    }
    
    $mysql->close();    
    die(json_encode("Сохранено!", JSON_UNESCAPED_UNICODE));
?>