<?php               
    $tmp_name = $_FILES["edit_avatar"]["tmp_name"];
    $name_new_image = basename($_FILES["edit_avatar"]["name"]);
    $uploads_dir = __DIR__."/../../images";  
    $new_avatar = "images/".$name_new_image;

    require __DIR__."/../database/connect.php";
    if (isset($_COOKIE['newUser']) && !empty($_COOKIE['newUser']))
        $login=$_COOKIE['newUser']; 
    if ($name_new_image != '' && $tmp_name !='')         
    {
        //если в директории нет файла перемещаем
        if (!file_exists("$uploads_dir/$name_new_image"))
            move_uploaded_file($tmp_name, "$uploads_dir/$name_new_image");                
    }
    else
    {
        $new_avatar="images/default_image.png";
    }      
    $mysql->query("UPDATE `staff` SET staff.image = '$new_avatar' WHERE staff.login = '$login'");
    $mysql->close();    
?>