<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">    
    <link REL=stylesheet HREF="css/mainMenu_and_bg.css" TYPE="text/css"> 
    <link REL=stylesheet HREF="css/map/workplaces_list.css" TYPE="text/css">  
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
    <script src="https://kit.fontawesome.com/3097d0fe75.js" crossorigin="anonymous"></script> 
    <title>Карта</title>
</head>
<body>
    <div class="container">    
        <!--если нет авторизованной сессии редирект на страницу логина-->     
        <?php
            if (!isset($_COOKIE['newUser']) || empty($_COOKIE['newUser'])):        
                header('Location: /');
                endif;?> 
        <div id="rectangle" class="menu_bg">
            <?php
                require realpath("php/get_front_menu_info.php");
            ?>  
            <div>      
                <p><img src="<?=$front_avatar?>" class="front_avatar" alt="Аватар"></p>   
                <p class="front_name"><?=$front_name?></p>             
            </div> 
            <div class="vertical-menu">
                <a href="account.php">Личный кабинет</a>
                <a href="" class="active">Карта</a>
                <a href="staff_list.php">Список сотрудников</a>
            </div> 
            <form class="exit_button" method="post" action="php/auth/auth_exit.php">
                <button class="button_exit" type="submit">Выйти</button>
            </form>
        </div> 
        <div id="rectangle" class="main_part">
            <!--WRITE CODE HERE -->
            <div class=wrap_table>   
                <table>
                    <tr class="table_header" id="table_header">                        
                        <th >Доступные столы</th>                       
                    </tr>       
                    <tbody id="worplaces_list"></tbody>         
                </table>
            </div>      
            <script src="js/worplaces_items.js"></script>
            <script type="text/javascript">getItems();</script>
            <?php
                require "php/database/role_identification.php";

                if ($currentRole ==  1): ?>   <!--admin-->   
                    <a href="admin_editing_mode.php" class="">
                    <form class="" action="admin_editing_mode.php">
                        <button class="button_edit_mode_switch">Редактирование</button>
                    </form> 
                </a> 
                <?php endif;

                
                if ($currentRole ==  2): ?>   <!--user-->   
                    
            <?php endif;?>   
        </div>                 
    </div>
</body>
</html>