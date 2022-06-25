<?php    
    try 
    {         
        $currId = trim($_POST['id']);
        $startDate = trim($_POST['startDate']);
        $endDate =  trim($_POST['endDate']);
        
        require __DIR__."/../database/connect.php";  
        if (isset($_COOKIE['newUser']) && !empty($_COOKIE['newUser']))
                $login=$_COOKIE['newUser'];    
        
        $sqlResult = $mysql->query("
        INSERT INTO `booking_list` (`staff_id`, `workplaсe_id`, `start_time`, `end_time`, `IsPermanently`) 
        VALUES ((SELECT staff.id FROM `staff` WHERE staff.login='$login'), '$currId', '$startDate', '$endDate', '0')");  
        $mysql->close();
        //выводим Добавлено!
        die(json_encode("Добавлено!", JSON_UNESCAPED_UNICODE));
    } 
    catch (Throwable $th) 
    {        
        //ошибка об неправильности
        die(json_encode("Ошибка!", JSON_UNESCAPED_UNICODE));
    }  
    
?>