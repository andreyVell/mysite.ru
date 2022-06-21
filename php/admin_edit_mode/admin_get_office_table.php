<?php    
    require __DIR__."/../database/connect.php";
    if (isset($_COOKIE['newUser']) && !empty($_COOKIE['newUser']))
        $login=$_COOKIE['newUser'];
    $sqlResult = $mysql->query("
    SELECT * FROM `offices`"); 
    $mysql->close();
    $rows = mysqli_fetch_all($sqlResult);
    die(json_encode($rows, JSON_UNESCAPED_UNICODE));    
?>