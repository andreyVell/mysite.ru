<?php
    $floor = trim($_POST['floor']);
    $number =  trim($_POST['number']);
    
    require __DIR__."/../database/connect.php";
    if (isset($_COOKIE['newUser']) && !empty($_COOKIE['newUser']))
        $login=$_COOKIE['newUser'];    
    
    try 
    {           
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