<?php    
    require __DIR__."/../database/connect.php";
    if (isset($_COOKIE['newUser']) && !empty($_COOKIE['newUser']))
        $login=$_COOKIE['newUser'];
    $sqlResult = $mysql->query("
    SELECT
        staff.id,
        staff.image,
        staff.last_name,
        staff.first_name,
        staff.patronymic,
        staff.phone_number,
        staff.email_adress,
        staff.login,
        staff.password,
        staff.department,
        offices.floor,
        offices.office_number,
        workplaces.number
    FROM `staff` 	
        LEFT JOIN `uniqueBooking_list` ON staff.id = uniqueBooking_list.staff_id
        LEFT JOIN `workplaces` ON uniqueBooking_list.workplaсe_id = workplaces.id
        LEFT JOIN `offices` ON offices.id = workplaces.office
    ORDER BY staff.id"); 
    $mysql->close();
    $rows = mysqli_fetch_all($sqlResult);
    die(json_encode($rows, JSON_UNESCAPED_UNICODE));    
?>