<?php        
    try
    {        
        require __DIR__."/../database/connect.php";
        if (isset($_COOKIE['newUser']) && !empty($_COOKIE['newUser']))
            $login=$_COOKIE['newUser'];
        $sqlResult= $mysql->query("
        SELECT              
            booking_list.IsPermanently
        FROM `booking_list` 
            JOIN `staff` ON booking_list.staff_id=staff.id AND staff.login='$login'
            WHERE booking_list.end_time>=CURRENT_DATE() AND booking_list.start_time<=CURRENT_DATE()  ");    
        $curInfo = $sqlResult->fetch_array();
        die(json_encode($curInfo, JSON_UNESCAPED_UNICODE)); 
    }
    catch (Throwable $th) 
    {        
        //ошибка об неправильности
        die(json_encode("Ошибка!", JSON_UNESCAPED_UNICODE));
    }  
?>