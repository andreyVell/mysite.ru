<?php
    $officeId = trim($_POST['office_id']);
    $specifications = trim($_POST['specifications']);
    $number =  trim($_POST['number']);
    
    require __DIR__."/../database/connect.php";     
    try 
    {         
        //проверка есть ли уже в данном офисе стол с таким номером
        $sqlResult = $mysql->query("
        SELECT * FROM `workplaces` WHERE workplaces.office='$officeId' AND workplaces.number='$number' AND workplaces.IsDeleted='0'");  
        $rows = mysqli_fetch_all($sqlResult, MYSQLI_ASSOC);
        if (count($rows)>0)
            die(json_encode("В этом офисе уже есть стол с таким номером!", JSON_UNESCAPED_UNICODE));

        $sqlResult = $mysql->query("
        INSERT INTO `workplaces` (`number`, `specifications`, `IsDeleted`, `IsBusy`, `office`) VALUES ('$number', '$specifications', '0', '0', '$officeId')");  
        $mysql->close();
        //выводим Добавлено!
        die(json_encode("Добавлено!", JSON_UNESCAPED_UNICODE));
    } 
    catch (Throwable $th) 
    {        
        //ошибка об неправильности
        die(json_encode("Ошибка!", JSON_UNESCAPED_UNICODE));
    }  
    
?>