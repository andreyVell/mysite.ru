<?php     

    
    $id_curr =trim($_POST['id']);   
    $role_new = trim($_POST['role']);
    $first_name_new =  trim($_POST['first_name']);
    $last_name_new =  trim($_POST['last_name']);
    $patronymic_new =  trim($_POST['patronymic']);
    $login_new = trim($_POST['login']);    
    $password_new = trim($_POST['password']);
    $phone_number_new = trim($_POST['phone_number']);    
    $email_new = trim($_POST['email']);
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
        //проверка на уникальность логина
        if (count($rows)==0)
        {        
            //если изменяется текущий логин\пароль сбрасываем сессию  
            $sqlResult = $mysql->query("
                SELECT
                    staff.login
                FROM `staff` 	
                    WHERE staff.id='$id_curr'");  
            $users = $sqlResult->fetch_array();
            if ($users['login']==$login && ($login_new!='' || $password_new!=''))
                setcookie('newUser',$login, time()-15*60, "/");

            //изменяем значения если они не пустые
            if ($role_new!='')
                $mysql->query("UPDATE `staff` SET staff.role = '$role_new' WHERE staff.id = '$id_curr'");

            if ($login_new!='')
            $mysql->query("UPDATE `staff` SET staff.login = '$login_new' WHERE staff.id = '$id_curr'");

            if ($password_new!='')
            {
                $password_new = md5($password_new."dfgdfge4t34gfb");
                $mysql->query("UPDATE `staff` SET staff.password = '$password_new' WHERE staff.id = '$id_curr'");
            }

            if ($first_name_new!='')
            $mysql->query("UPDATE `staff` SET staff.first_name = '$first_name_new' WHERE staff.id = '$id_curr'");

            if ($last_name_new!='')
            $mysql->query("UPDATE `staff` SET staff.last_name = '$last_name_new' WHERE staff.id = '$id_curr'");

            if ($patronymic_new!='')
            $mysql->query("UPDATE `staff` SET staff.patronymic = '$patronymic_new' WHERE staff.id = '$id_curr'");

            if ($phone_number_new!='')
            $mysql->query("UPDATE `staff` SET staff.phone_number = '$phone_number_new' WHERE staff.id = '$id_curr'");

            if ($email_new!='')
            $mysql->query("UPDATE `staff` SET staff.email_adress = '$email_new' WHERE staff.id = '$id_curr'");

            if ($department_new!='')
            $mysql->query("UPDATE `staff` SET staff.department = '$department_new' WHERE staff.id = '$id_curr'");
                    
        }
        else
        {
            //ошибка логин не уникальный
            die(json_encode("Введёный логин уже используется!", JSON_UNESCAPED_UNICODE));
        }
        
    } 
    catch (Throwable $th) 
    {        
        //ошибка об неправильности чего-либо
        die(json_encode("Ошибка!", JSON_UNESCAPED_UNICODE));
    }
    
    $mysql->close();    
    die(json_encode("Сохранено!", JSON_UNESCAPED_UNICODE));
?>