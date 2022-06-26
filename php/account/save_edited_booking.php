<?php    
    try 
    {         
        $currId = trim($_POST['id']);
        $startDate = trim($_POST['startDate']);
        $endDate =  trim($_POST['endDate']);
           
        
        require __DIR__."/../database/connect.php";    
        $sqlResult = $mysql->query("
        UPDATE `booking_list` SET booking_list.start_time='$startDate', booking_list.end_time='$endDate' WHERE booking_list.id='$currId'");  
        $mysql->close();
        //выводим Добавлено!
        require __DIR__."/../database/dateCheck.php";
        die(json_encode("Сохранено!", JSON_UNESCAPED_UNICODE));
    } 
    catch (Throwable $th) 
    {        
        //ошибка об неправильности
        die(json_encode("Ошибка!", JSON_UNESCAPED_UNICODE));
    }  
    
?>