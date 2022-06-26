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
        LEFT JOIN `booking_list` ON staff.id = booking_list.staff_id
        LEFT JOIN `workplaces` ON booking_list.workplaсe_id = workplaces.id
        LEFT JOIN `offices` ON offices.id = workplaces.office
        WHERE staff.login='$login'
        GROUP BY staff.id"); 
    $users = $sqlResult->fetch_array();
    
    $id = $users['id'];
    $avatar =$users['image'];
    $name=$users['last_name']." ".$users['first_name']." ".$users['patronymic'];
    $workplace=$users['department'].", этаж ".$users['floor'].", офис ".$users['office_number'].", рабочее место ".$users['number'];
    if ($users['department']=='' ||$users['floor']==''||$users['office_number']=='' || $users['number']=='')     
        $workplace='---';
    $phone_number = $users['phone_number'];
    $email_address = $users['email_adress'];
    $first_name=$users['first_name'];
    $last_name=$users['last_name'];
    $patronymic=$users['patronymic'];
    $old_password=$users['password'];
?>