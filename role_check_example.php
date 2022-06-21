<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link REL=stylesheet HREF="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" TYPE="text/css">    
    <link REL=stylesheet HREF="css/auth.css" TYPE="text/css"> 
    <title>Главная</title>
    <script src="js/logIn.js"></script>
</head>
<body>
<div class="container">    
        <!--если нет авторизованной сессии редирект на страницу логина-->     
        <?php
            if (!isset($_COOKIE['newUser']) || empty($_COOKIE['newUser'])):        
                header('Location: /');
                endif;?> 
        <!--чекаем роль в зависимости от роли строим определённый интерфейс admin\user-->
        <?php
            require "php/role_identification.php";

            if ($currentRole ==  1): ?>   <!--admin-->   
                <h1>Hello admin!</h1>  
                <p>Hello <?=$_COOKIE['newUser']?>! <a href="php/auth_exit.php">Exit</a></p> 
            <?php endif;

            
            if ($currentRole ==  2): ?>   <!--user-->   
                <h1>Hello user!</h1>  
                <p>Hello <?=$_COOKIE['newUser']?>! <a href="php/auth_exit.php">Exit</a></p> 
            <?php endif;?>                           
    </div>
</body>
</html>