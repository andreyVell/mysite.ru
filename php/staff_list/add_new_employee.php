<?php  
    if (count($_FILES)==0)
    {
        $name_new_image='';
        $tmp_name='';
    }
    else
    {
        $tmp_name = $_FILES["new_avatar"]["tmp_name"];
        $name_new_image = basename($_FILES["new_avatar"]["name"]);
    }
    $uploads_dir = __DIR__."/../../images";  
    $new_avatar = "images/".$name_new_image; 
    $role_new = trim($_POST['role']);
    $first_name_new =  trim($_POST['first_name']);
    $last_name_new =  trim($_POST['last_name']);
    $patronymic_new =  trim($_POST['patronymic']);
    $login_new = trim($_POST['login']);
    $password_new = trim($_POST['password']);
    $phone_number_new = trim($_POST['phone_number']);    
    $email_new = trim($_POST['email_address']);   
    
    $department_new = trim($_POST['department']);   
    
    require __DIR__."/../database/connect.php";
    if (isset($_COOKIE['newUser']) && !empty($_COOKIE['newUser']))
        $login=$_COOKIE['newUser'];    
    $sqlResult = $mysql->query("
        SELECT
            staff.login
        FROM `staff` 	
            WHERE staff.login='$login_new'");     
    $rows = mysqli_fetch_all($sqlResult, MYSQLI_ASSOC);
    try 
    {   
        if (count($rows)==0)
        {      
            //загружаем аватарку   
            if ($name_new_image != '' && $tmp_name !='')         
            {
                move_uploaded_file($tmp_name, "$uploads_dir/$name_new_image");                
            }
            else
            {
                $new_avatar="images/default_image.png";
            }            
            //обновление пароля
            if ($password_new != '')         
            {
                $password_new = md5($password_new."dfgdfge4t34gfb");                
            }            
            
            //загрузка в бд!
            $mysql->query("
                INSERT INTO `staff`(
                    staff.login,
                    staff.password,
                    staff.image,
                    staff.role,
                    staff.first_name,
                    staff.last_name,
                    staff.patronymic,
                    staff.phone_number,
                    staff.email_adress,
                    staff.department)
                VALUES(
                    '$login_new',
                    '$password_new',
                    '$new_avatar',
                    '$role_new',
                    '$first_name_new',
                    '$last_name_new',
                    '$patronymic_new',
                    '$phone_number_new',
                    '$email_new',
                    '$department_new'
                )");  
        }
        else
        {
            //ошибка об неуникальности логина через кукисы                
            die(json_encode("Введёный логин уже используется!", JSON_UNESCAPED_UNICODE));
        }
        
    } 
    catch (Throwable $th) 
    {        
        //ошибка об неправильности через кукисы
        die(json_encode("Ошибка!", JSON_UNESCAPED_UNICODE));
    }    
    $mysql->close();
    //выводим Добавлено!
    die(json_encode("Добавлено!", JSON_UNESCAPED_UNICODE));
?>