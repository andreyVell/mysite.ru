<?php   
    if (count($_FILES)==0)
    {
        $name_new_image='';
        $tmp_name='';
    }
    else
    {
        $tmp_name = $_FILES["edit_one_scheme"]["tmp_name"];
        $name_new_image = basename($_FILES["edit_one_scheme"]["name"]);
    }   
    $uploads_dir = __DIR__."/../../office_schemes";
    $new_scheme = "office_schemes/".$name_new_image;
    
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

        //обновление схемы  
        if ($name_new_image != '')         
        {
            move_uploaded_file($tmp_name, "$uploads_dir/$name_new_image");
            $mysql->query("UPDATE `offices` SET offices.office_scheme = '$new_scheme' WHERE offices.id = '$id_curr'"); 
        }
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