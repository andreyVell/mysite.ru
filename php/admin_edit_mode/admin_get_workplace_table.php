<?php    
    require __DIR__."/../database/connect.php";    
    $sqlResult = $mysql->query("
    SELECT
        workplaces.id,
        offices.floor,
        offices.office_number,
        workplaces.number,
        workplaces.specifications,
        workplaces.IsBusy
    FROM `workplaces`
        LEFT JOIN `offices` ON offices.id = workplaces.office
        WHERE workplaces.IsDeleted = 0"); 
    $mysql->close();
    $rows = mysqli_fetch_all($sqlResult);
    die(json_encode($rows, JSON_UNESCAPED_UNICODE));    
?>