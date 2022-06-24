<?php    
    
    try
    {
        $curId = trim($_POST['id']);
        require __DIR__."/../database/connect.php";        
        $sqlResult= $mysql->query("
        SELECT
            offices.floor,
            offices.office_number,
            workplaces.number,
            workplaces.specifications
        FROM workplaces
            JOIN `offices` ON offices.id = workplaces.office
            WHERE workplaces.id ='$curId '");    
        $curInfo = $sqlResult->fetch_array();
        die(json_encode($curInfo, JSON_UNESCAPED_UNICODE)); 
    }
    catch (Throwable $th) 
    {        
        //ошибка об неправильности
        die(json_encode("Ошибка!", JSON_UNESCAPED_UNICODE));
    }  
?>