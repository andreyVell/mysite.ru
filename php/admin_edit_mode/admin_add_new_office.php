<?php
    $floor = trim($_POST['floor']);
    $number =  trim($_POST['number']);
    
    require __DIR__."/../database/connect.php";
    if (isset($_COOKIE['newUser']) && !empty($_COOKIE['newUser']))
        $login=$_COOKIE['newUser'];    
    
    try 
    {           
        //проверка есть ли уже на данном этаже офисс таким же номером
        $sqlResult = $mysql->query("
        SELECT * FROM `offices` WHERE offices.floor='$floor' AND offices.office_number='$number' ");  
        $rows = mysqli_fetch_all($sqlResult, MYSQLI_ASSOC);
        if (count($rows)>0)
            die(json_encode("На этом этаже уже есть офис с таким номером!", JSON_UNESCAPED_UNICODE));

        $sqlResult = $mysql->query("
        INSERT INTO `offices` (floor, office_number) VALUES ('$floor', '$number')");  
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