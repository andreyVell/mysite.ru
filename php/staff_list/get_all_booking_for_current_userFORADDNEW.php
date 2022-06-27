<?php        
    try
    {        
        $curUserId = trim($_POST['curUserId']);
        require __DIR__."/../database/connect.php";            
        $sqlResult= $mysql->query("
        SELECT
            booking_list.start_time,
            booking_list.end_time
        FROM `booking_list` WHERE booking_list.staff_id = '$curUserId'");    
        $curInfo = mysqli_fetch_all($sqlResult);
        die(json_encode($curInfo, JSON_UNESCAPED_UNICODE)); 
    }
    catch (Throwable $th) 
    {        
        //ошибка об неправильности
        die(json_encode("Ошибка!", JSON_UNESCAPED_UNICODE));
    }  
?>