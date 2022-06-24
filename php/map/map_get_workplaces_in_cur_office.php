<?php    
    
    try
    {
        $curId = trim($_POST['id']);
        require __DIR__."/../database/connect.php";        
        $sqlResult= $mysql->query("
        SELECT * FROM `workplaces`
        WHERE workplaces.office='$curId' and workplaces.IsDeleted=0");    
        $curInfo = mysqli_fetch_all($sqlResult);
        die(json_encode($curInfo, JSON_UNESCAPED_UNICODE)); 
    }
    catch (Throwable $th) 
    {        
        //ошибка об неправильности
        die(json_encode("Ошибка!", JSON_UNESCAPED_UNICODE));
    }  
?>