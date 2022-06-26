<?php        
    try
    {
        $bookingId = trim($_POST['bookingId']);
        require __DIR__."/../database/connect.php";
        if (isset($_COOKIE['newUser']) && !empty($_COOKIE['newUser']))
            $login=$_COOKIE['newUser'];     
        $sqlResult= $mysql->query("
        SELECT
            booking_list.start_time,
            booking_list.end_time
        FROM `booking_list` WHERE booking_list.staff_id = (SELECT staff.id FROM `staff` WHERE staff.login='$login') AND booking_list.id!='$bookingId'");    
        $curInfo = mysqli_fetch_all($sqlResult);
        die(json_encode($curInfo, JSON_UNESCAPED_UNICODE)); 
    }
    catch (Throwable $th) 
    {        
        //ошибка об неправильности
        die(json_encode("Ошибка!", JSON_UNESCAPED_UNICODE));
    }  
?>