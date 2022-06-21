<?php
    setcookie('newUser',$users['login'], time()-15*60, "/");
    header('Location: /');
?>