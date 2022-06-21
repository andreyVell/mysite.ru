<?php
    $login = trim($_POST['login']);
    $password = trim($_POST['password']);
    
    $password = md5($password."dfgdfge4t34gfb");
    
    require __DIR__."/../database/connect.php";

    $sqlResult = $mysql->query("SELECT * FROM `Staff` WHERE `login`='$login' AND `password`='$password'");
    $mysql->close();

    $users = $sqlResult->fetch_array();
    if (!isset ($users) || count($users) == 0)
    {
        //User not found!
        setcookie('userNotFound','none', time()+30, "/");       
        header('Location: /');
        exit();        
    }

    setcookie('userNotFound','none', time()-30, "/");  

    setcookie('newUser',$users['login'], time()+15*60, "/");
    

    header('Location: /');
?>