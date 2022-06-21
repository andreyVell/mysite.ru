<?php   

    
    $id_curr =trim($_POST['id']);   
    $floor_new = trim($_POST['floor']);
    $number_new =  trim($_POST['number']);    
    require __DIR__."/../database/connect.php";    
    try 
    {   
        //проверка есть ли уже на данном этаже офисс таким же номером
        $sqlResult = $mysql->query("
        SELECT * FROM `offices` WHERE offices.floor='$floor_new' AND offices.office_number='$number_new' ");  
        $rows = mysqli_fetch_all($sqlResult, MYSQLI_ASSOC);
        if (count($rows)>0)
            die(json_encode("На этом этаже уже есть офис с таким номером!", JSON_UNESCAPED_UNICODE));

        //изменяем значения если они не пустые
        if ($floor_new!='')
            $mysql->query("UPDATE `offices` SET offices.floor = '$floor_new' WHERE offices.id = '$id_curr'");

        if ($number_new!='')
            $mysql->query("UPDATE `offices` SET offices.office_number = '$number_new' WHERE offices.id = '$id_curr'");
    } 
    catch (Throwable $th) 
    {        
        //ошибка об неправильности чего-либо
        die(json_encode("Ошибка!", JSON_UNESCAPED_UNICODE));
    }
    $mysql->close();    
    die(json_encode("Сохранено!", JSON_UNESCAPED_UNICODE));
?>