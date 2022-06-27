<?php    
    
    try
    {        
        require __DIR__."/../database/connect.php";        
        $sqlResult= $mysql->query("
        SELECT             
            staff.last_name,
            staff.first_name,
            staff.patronymic,
            offices.floor,
            offices.office_number,
            workplaces.number,
            workplaces.specifications,
            booking_list.start_time,
            booking_list.end_time
        FROM `booking_list`
            JOIN `staff` ON booking_list.staff_id=staff.id
            JOIN `workplaces` ON booking_list.workplaсe_id=workplaces.id
            JOIN `offices` ON offices.id=workplaces.office            
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