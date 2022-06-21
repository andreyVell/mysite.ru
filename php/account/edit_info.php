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

    $first_name_new =  trim($_POST['first_name']);
    $last_name_new =  trim($_POST['last_name']);
    $patronymic_new =  trim($_POST['patronymic']);
    $login_new = trim($_POST['login']);
    $password_old = trim($_POST['old_password']);
    $password_new = trim($_POST['new_password']);
    $phone_number_new = trim($_POST['phone_number']);    
    $email_new = trim($_POST['email_address']);    
    if ($name_new_image == '' && $first_name_new == '' && $last_name_new =='' && $patronymic_new=='' && $login_new=='' && $password_new=='' &&$phone_number_new=='' && $email_new=='')
    {        
        exit();
    }
    require __DIR__."/../database/connect.php";
    if (isset($_COOKIE['newUser']) && !empty($_COOKIE['newUser']))
        $login=$_COOKIE['newUser'];
    $sqlResult = $mysql->query("
        SELECT
            staff.password
        FROM `staff` 	
            WHERE staff.login='$login'"); 
    $users = $sqlResult->fetch_array();
    $password = $users['password'];
    $sqlResult = $mysql->query("
        SELECT
            staff.login
        FROM `staff` 	
            WHERE staff.login='$login_new'"); 
    
    $rows = mysqli_fetch_all($sqlResult, MYSQLI_ASSOC);
    try 
    {        
        if (md5($password_old."dfgdfge4t34gfb")==$password)
        {
            if (count($rows)==0)
            {                 
                //обновление аватарки    
                if ($name_new_image != '')         
                {
                    move_uploaded_file($tmp_name, "$uploads_dir/$name_new_image");
                    $mysql->query("
                        UPDATE `staff`
                        SET staff.image = '$new_avatar'
                        WHERE staff.login='$login'"); 
                }
                //обновление имени
                if ($first_name_new != '')         
                {
                    $mysql->query("
                        UPDATE `staff`
                        SET staff.first_name = '$first_name_new'
                        WHERE staff.login='$login'"); 
                }
                //обновление фамилии
                if ($last_name_new != '')         
                {
                    $mysql->query("
                        UPDATE `staff`
                        SET staff.last_name = '$last_name_new'
                        WHERE staff.login='$login'"); 
                }
                //обновление отчества
                if ($patronymic_new != '')         
                {
                    $mysql->query("
                        UPDATE `staff`
                        SET staff.patronymic = '$patronymic_new'
                        WHERE staff.login='$login'"); 
                }
                //обновление пароля
                if ($password_new != '')         
                {
                    $password_new = md5($password_new."dfgdfge4t34gfb");
                    $mysql->query("
                        UPDATE `staff`
                        SET staff.password = '$password_new'
                        WHERE staff.login='$login'");
                    setcookie('newUser',$login, time()-15*60, "/"); 
                }
                //обновление номера телефона
                if ($phone_number_new != '')         
                {
                    $mysql->query("
                        UPDATE `staff`
                        SET staff.phone_number = '$phone_number_new'
                        WHERE staff.login='$login'"); 
                }
                //обновление адреса почты
                if ($email_new != '')         
                {
                    $mysql->query("
                        UPDATE `staff`
                        SET staff.email_adress = '$email_new'
                        WHERE staff.login='$login'"); 
                }
                //обновление логина
                if ($login_new != '')         
                {
                    //обработать кукисы при смене логина (логин в самом конце)
                    $mysql->query("
                        UPDATE `staff`
                        SET staff.login = '$login_new'
                        WHERE staff.login='$login'");
                    setcookie('newUser',$login, time()-15*60, "/"); 
                }                   
            }
            else
            {
                //ошибка об неуникальности логина             
                die(json_encode("Введёный логин уже используется!", JSON_UNESCAPED_UNICODE));
            }
        }
        else
        {
            //ошибка об неправильности пароля              
            die(json_encode("Старый пароль введён неверно!", JSON_UNESCAPED_UNICODE));
        }
    } 
    catch (Throwable $th) 
    {        
        //ошибка об неправильности
        die(json_encode("Ошибка!", JSON_UNESCAPED_UNICODE));
    }    
    $mysql->close();
    //выводим Сохранено!
    die(json_encode("Сохранено!", JSON_UNESCAPED_UNICODE));
?>