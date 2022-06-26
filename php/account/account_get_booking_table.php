<?php    
    require __DIR__."/../database/connect.php";
    if (isset($_COOKIE['newUser']) && !empty($_COOKIE['newUser']))
        $login=$_COOKIE['newUser'];
    $sqlResult = $mysql->query("
    SELECT
        booking_list.id,
        offices.floor,
        offices.office_number,
        workplaces.number,
        booking_list.start_time,
        booking_list.end_time,
        booking_list.IsPermanently,
        booking_list.workplaсe_id
    FROM `booking_list`         
        LEFT JOIN `workplaces` ON workplaces.id = booking_list.workplaсe_id
        LEFT JOIN `offices` ON offices.id = workplaces.office
        WHERE booking_list.staff_id = (SELECT staff.id FROM staff WHERE staff.login = '$login')
    ORDER BY booking_list.start_time DESC");
    $mysql->close();
    $rows = mysqli_fetch_all($sqlResult);
    die(json_encode($rows, JSON_UNESCAPED_UNICODE));    
?>