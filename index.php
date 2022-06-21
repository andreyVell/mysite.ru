<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link REL=stylesheet HREF="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" TYPE="text/css">    
    <link REL=stylesheet HREF="css/auth/auth.css" TYPE="text/css"> 
    <title>Авторизация</title>
</head>
<body>
    <div class="container"> 
        <?php
            if (isset($_COOKIE['userNotFound']) && $_COOKIE['userNotFound']=='none'):                      
        ?>
            <script type='text/javascript'>alert('Пользователь не найден!');</script>
        <?php endif;?> 
        <?php
            if (!isset($_COOKIE['newUser']) || empty($_COOKIE['newUser'])):
        ?>
            <form class="auth_form" method="post" action="php/auth/auth_logIn.php">
                <h1>PARMA</h1>
                <h2>technologies group</h2><br>
                <h3>Интерактивная карта офиса</h3><br>
                <h4>Авторизация</h4>
                <input type="text" class="form-control" name="login" id="login" placeholder="Логин" required="required"><br>
                <input type="password" class="form-control" name="password" id="password" placeholder="Пароль" required="required"><br>            
                <button class="btn btn-success" type="submit">Войти</button>
            </form>     
        <?php else:
            header('Location: /account.php');
            endif;?>          
    </div>
</body>
</html>