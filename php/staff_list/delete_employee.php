<?php    
    $deleteId = trim($_POST['id']);
    require __DIR__."/../database/connect.php";
    if (isset($_COOKIE['newUser']) && !empty($_COOKIE['newUser']))
        $login=$_COOKIE['newUser'];    
    $sqlResult= $mysql->query("
        SELECT
            staff.login
        FROM `staff` 	
            WHERE staff.id='$deleteId'");    
    $users = $sqlResult->fetch_array();
    $deletedLogin=$users['login'];
    $sqlResult = $mysql->query("
        DELETE FROM `staff` WHERE staff.id='$deleteId'"); 
    if ($deletedLogin == $login)
        setcookie('newUser',$login, time()-15*60, "/");
    $mysql->close();   
?>