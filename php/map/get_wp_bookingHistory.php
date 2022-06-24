<?php    
    
    try
    {
        $curId = trim($_POST['id']);
        require __DIR__."/../database/connect.php";        
        $sqlResult= $mysql->query("
        SELECT  
            staff.first_name,
            staff.last_name,
            staff.patronymic,
            booking_list.start_time,
            booking_list.end_time
        FROM `booking_list`
            JOIN `staff` ON booking_list.staff_id=staff.id
            WHERE booking_list.workplaсe_id='$curId'
            ORDER BY booking_list.start_time DESC");    
        $curInfo = mysqli_fetch_all($sqlResult);
        die(json_encode($curInfo, JSON_UNESCAPED_UNICODE)); 
    }
    catch (Throwable $th) 
    {        
        //ошибка об неправильности
        die(json_encode("Ошибка!", JSON_UNESCAPED_UNICODE));
    }  
?>