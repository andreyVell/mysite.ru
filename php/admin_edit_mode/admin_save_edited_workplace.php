<?php   

    
    $id_curr =trim($_POST['id']);   
    $office_new = trim($_POST['office']);
    $specifications_new =  trim($_POST['specifications']); 
    $number_new =  trim($_POST['number']);     
    require __DIR__."/../database/connect.php";    
    try 
    {   
        //проверка есть ли уже в данном офисе стол с таким номером
        $sqlResult = $mysql->query("
        SELECT * FROM `workplaces` WHERE workplaces.office='$office_new' AND workplaces.number='$number_new' AND workplaces.IsDeleted='0'");  
        $rows = mysqli_fetch_all($sqlResult, MYSQLI_ASSOC);
        if (count($rows)>0)
            die(json_encode("В этом офисе уже есть стол с таким номером!", JSON_UNESCAPED_UNICODE));

        //изменяем значения если они не пустые
        if ($office_new!='')
            $mysql->query("UPDATE `workplaces` SET workplaces.office = '$office_new' WHERE workplaces.id = '$id_curr'");

        if ($specifications_new!='')
            $mysql->query("UPDATE `workplaces` SET workplaces.specifications = '$specifications_new' WHERE workplaces.id = '$id_curr'");

        if ($number_new!='')
            $mysql->query("UPDATE `workplaces` SET workplaces.number = '$number_new' WHERE workplaces.id = '$id_curr'");
    } 
    catch (Throwable $th) 
    {        
        //ошибка об неправильности чего-либо
        die(json_encode("Ошибка!", JSON_UNESCAPED_UNICODE));
    }
    $mysql->close();    
    die(json_encode("Сохранено!", JSON_UNESCAPED_UNICODE));
?>