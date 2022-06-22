<?php
    if (count($_FILES)==0)
    {
        $name_new_image='';
        $tmp_name='';
    }
    else
    {
        $tmp_name = $_FILES["add_new_scheme"]["tmp_name"];
        $name_new_image = basename($_FILES["add_new_scheme"]["name"]);
    }
    $uploads_dir = __DIR__."/../../office_schemes";  
    $new_scheme = "office_schemes/".$name_new_image; 

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
        //загружаем аватарку           
        if ($name_new_image != '' && $tmp_name !='')         
        {
            move_uploaded_file($tmp_name, "$uploads_dir/$name_new_image");                
        }
        else
        {
            $new_scheme="office_schemes/default.jpg";
        }       
        $sqlResult = $mysql->query("
        INSERT INTO `offices` (floor, office_number, office_scheme) VALUES ('$floor', '$number', '$new_scheme')");  
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