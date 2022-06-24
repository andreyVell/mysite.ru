<?php    
    
    try
    {
        $curId = trim($_POST['id']);
        require __DIR__."/../database/connect.php";        
        $sqlResult= $mysql->query("
        SELECT
            staff.first_name,
            staff.last_name,
            staff.patronymic
        FROM `staff`
            JOIN `booking_list` ON booking_list.staff_id=staff.id 
                AND booking_list.workplaсe_id='$curId' 
                AND booking_list.start_time<=CURRENT_DATE() 
                AND booking_list.end_time >=CURRENT_DATE()");    
        $curInfo = $sqlResult->fetch_array();
        die(json_encode($curInfo, JSON_UNESCAPED_UNICODE)); 
    }
    catch (Throwable $th) 
    {        
        //ошибка об неправильности
        die(json_encode("Ошибка!", JSON_UNESCAPED_UNICODE));
    }  
?>