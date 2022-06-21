<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!--<link REL=stylesheet HREF="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" TYPE="text/css"> -->
    <link REL=stylesheet HREF="css/mainMenu_and_bg.css" TYPE="text/css"> 
    <link REL=stylesheet HREF="css/account/account_tab.css" TYPE="text/css">     
    <link REL=stylesheet HREF="css/account/popup.css" TYPE="text/css">     
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
    <script src="https://kit.fontawesome.com/3097d0fe75.js" crossorigin="anonymous"></script>
    <title>Личный кабинет</title>
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
                <a href="" class="active">Личный кабинет</a>
                <a href="map.php">Карта</a>
                <a href="staff_list.php">Список сотрудников</a>
            </div> 
            <form class="exit_button" method="post" action="php/auth/auth_exit.php">
                <button class="button_exit" type="submit">Выйти</button>
            </form>
        </div>    
        <div id="rectangle" class="main_part"> 
            <?php
                require realpath("php/account/get_main_info.php");
            ?>                          
            <div class="tabs">
                <div class="tab-2">
                    <label for="tab2-1">Персональные данные</label>
                    <input id="tab2-1" name="tabs-two" type="radio" checked="checked">
                    <div>          
                        <div>           
                            <p><img src="<?=$avatar?>" class="full_avatar" alt="Аватар"></p> 
                            <p class="full_name"><?=$name?></p> 
                            <p class="full_location"><?=$workplace?></p> 
                        </div>
                        <div class="contact_info">
                            <p class="header">Телефон: <?=$phone_number?></p>
                            <p class="header">Почта: <?=$email_address?></p>  
                            <p class="header">Логин: <?=$login?></p> 
                        </div> 
                        <a href="#popupInfoEdit" class="popup-link">
                            <form class="form_button_change_info popup-link" method="post" action="#popupInfoEdit">
                                <button class="button_change_info popup-link" type="submit">Изменить персональные данные</button>
                            </form> 
                        </a>                                               
                        <div id="popupInfoEdit" class="popup">
                            <div class="popup_body">
                                <div class="popup_content"> 
                                    <div class="popup_text"> 
                                        <form class="edit_form" method="post" enctype="multipart/form-data">   
                                                <p>
                                                    <img src="<?=$avatar?>" id = "avatar_edit" class="edit_avatar" alt="Аватар">
                                                    <input type="file" class="uploadImage" name="new_avatar" id="new_avatar" multiple accept=".png, .jpg, .jpeg">    
                                                    <script src="js/image_preview_account.js"></script>                                       
                                                </p>                             
                                                <p><label class="edit_hint">Имя:</label><input type="text" class="form-control" name="first_name" id="first_name" placeholder="<?=$first_name?>"></p><br>                                   
                                                <p><label class="edit_hint">Фамилия:</label><input type="text" class="form-control" name="last_name" id="last_name" placeholder="<?=$last_name?>"></p><br> 
                                                <p><label class="edit_hint">Отчество:</label><input type="text" class="form-control" name="patronymic" id="patronymic" placeholder="<?=$patronymic?>"></p><br> 
                                                <p><label class="edit_hint">Логин:</label><input type="text" class="form-control" name="login" id="login" placeholder="<?=$login?>"></p><br> 
                                                <p><label class="edit_hint">Старый пароль:</label><input type="text" class="form-control" name="old_password" id="old_password" placeholder="Старый пароль"></p><br> 
                                                <p><label class="edit_hint">Новый пароль:</label><input type="text" class="form-control" name="new_password" id="new_password" placeholder="Новый пароль"></p><br> 
                                                <p><label class="edit_hint">Номер телефона:</label><input type="text" class="form-control" name="phone_number" id="phone_number" placeholder="<?=$phone_number?>"></p><br> 
                                                <p><label class="edit_hint">E-mail:</label><input type="text" class="form-control" name="email_address" id="email_address" placeholder="<?=$email_address?>"></p><br> 
                                                <button class="btn-save" id="save_edited_info" type="submit">Сохранить</button>                                                                                 
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>  
                        <script src="js/popups.js"></script>
                        <script src="js/save_edited_info_account.js"></script>
                    </div>
                </div>
                <div class="tab-2">
                    <label for="tab2-2">История бронирования</label>
                    <input id="tab2-2" name="tabs-two" type="radio">
                    <div class=wrap_table>
                        <table>
                            <tr class="table_header">
                                <td >№</td>
                                <td >Расположение</td>
                                <td >Номер рабочего места</td>
                                <td >Начало</td>
                                <td >Конец</td>
                            </tr>

                            <?php
                            foreach ($rows as $row) {
                                ?>
                                    <tr class="table_cell">
                                        <td><?php echo $row['id'];?></td>
                                        <td><?php echo "Этаж ".$row['floor'].", офис ".$row['office_number'].", стол ".$row['number'];?></td>
                                        <td><?php echo $row['number'];?></td>
                                        <td><?php echo $row['start_time'];?></td>                                
                                        <td><?php echo $row['end_time'];?></td>
                                    </tr>
                            <?php   }?>
                        </table>
                    </div>
                </div>
            </div>
        </div>                      
    </div>
</body>
</html>