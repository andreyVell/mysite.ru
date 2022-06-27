<?php    
    try 
    {         
        $staff_id = trim($_POST['staff_id']);
        $wp_id = trim($_POST['wp_id']);
        $start_time = trim($_POST['start_time']);
        $end_time = trim($_POST['end_time']);
        $IsPermanently = trim($_POST['IsPermanently']);
           
        
        require __DIR__."/../database/connect.php"; 

        $sqlResult = $mysql->query("
        INSERT INTO `booking_list` 
        (`staff_id`, `workplaсe_id`, `start_time`, `end_time`, `IsPermanently`) 
        VALUES ('$staff_id', '$wp_id', '$start_time', '$end_time', '$IsPermanently')");  
        $mysql->close();
        //выводим Добавлено!
        require __DIR__."/../database/dateCheck.php";
        die(json_encode("Добавлено!", JSON_UNESCAPED_UNICODE));
    } 
    catch (Throwable $th) 
    {        
        //ошибка об неправильности
        die(json_encode("Ошибка!", JSON_UNESCAPED_UNICODE));
    }  
    
?>