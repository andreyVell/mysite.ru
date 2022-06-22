<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">    
    <!--<link REL=stylesheet HREF="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" TYPE="text/css">-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link REL=stylesheet HREF="css/mainMenu_and_bg.css" TYPE="text/css"> 
    <link REL=stylesheet HREF="css/staff_list/staff_list.css" TYPE="text/css">        
    <link REL=stylesheet HREF="css/staff_list/add_popup.css" TYPE="text/css"> 
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
    <script src="https://kit.fontawesome.com/3097d0fe75.js" crossorigin="anonymous"></script>
    <title>Список сотрудников</title>
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
                <a href="map.php">Карта</a>
                <a href="" class="active">Список сотрудников</a>
            </div> 
            <form class="exit_button" method="post" action="php/auth/auth_exit.php">
                <button class="button_exit" type="submit">Выйти</button>
            </form>
        </div>   
        <div id="rectangle" class="main_part">   
            <div class=wrap_table>   
                <table>
                    <tr class="table_header" id="table_header">
                        <th ></th>
                        <th ></th>
                        <th >№</th>
                        <th >Фамилия</th>
                        <th >Имя</th>
                        <th >Отчество</th>
                        <th >Отдел</th>
                        <th >Место работы</th>
                        <th >Номер телефона</th>
                        <th >Почта</th>
                    </tr>       
                    <tbody id="staff_list"></tbody>         
                </table>
            </div>      
            <script src="js/staff_list/table_items.js"></script>
            <script type="text/javascript">getItems();</script>
            <?php
            require "php/database/role_identification.php";
            if ($currentRole ==  1): ?>   <!--admin-->   
                <a href="#popupInfoAdd" class="popup-link">
                    <form class="popup-link" action="#popupInfoAdd">
                        <button class="button_add popup-link">Добавить сотрудника</button>
                    </form> 
                </a>
                <!--add new -->
                <div id="popupInfoAdd" class="popup">
                    <div class="popup_body">
                        <div class="popup_content"> 
                            <div class="popup_text"> 
                                <form class="edit_form" method="post" enctype="multipart/form-data">   
                                        <p>
                                            <img src="images/default_image.png" id = "avatar_edit_add" class="edit_avatar" alt="Аватар">
                                            <input type="file" class="uploadImageAdd uploadImage" name="new_avatar" id="new_avatar" multiple accept=".png, .jpg, .jpeg">    
                                            <script src="js/staff_list/image_preview_add.js"></script>                                       
                                        </p> 
                                        <p><label class="edit_hint">Роль:</label><select class="form-control" name="role" id="role"><option value="1">HR</option><option selected value="2">Сотрудник</option></select></p><br> 
                                        <p><label class="edit_hint">Имя:</label><input type="text" class="form-control" name="first_name" id="first_name" ></p><br>                                   
                                        <p><label class="edit_hint">Фамилия:</label><input type="text" class="form-control" name="last_name" id="last_name" ></p><br> 
                                        <p><label class="edit_hint">Отчество:</label><input type="text" class="form-control" name="patronymic" id="patronymic" ></p><br> 
                                        <p><label class="edit_hint">Логин:</label><input type="text" class="form-control" name="login" id="login" ></p><br> 
                                        <p><label class="edit_hint">Пароль:</label><input type="text" class="form-control" name="password" id="password" ></p><br> 
                                        <p><label class="edit_hint">Номер телефона:</label><input type="text" class="form-control" name="phone_number" id="phone_number" ></p><br> 
                                        <p><label class="edit_hint">E-mail:</label><input type="text" class="form-control" name="email_address" id="email_address" ></p><br>
                                        <p><label class="edit_hint">Отдел:</label><input type="text" class="form-control" name="department" id="department" ></p><br> 
                                        <button class="btn-save" id="save_add_info">Сохранить</button>                                                                                 
                                </form>
                            </div>
                        </div>
                    </div>
                </div>  
                <script src="js/staff_list/save_new_info.js"></script>
                <!--editing an existing note -->
                <div id="popupInfoEdit" class="popup">
                    <div class="popup_body">
                        <div class="popup_content"> 
                            <div class="popup_text"> 
                                <form class="edit_form" method="POST" enctype="multipart/form-data">  
                                        <div id="current_id_for_edit" name='gg'></div> 
                                        <p>
                                            <img src="images/default_image.png" id = "avatar_edit_note" class="edit_avatar" alt="Аватар">
                                            <input type="file" class="uploadImageTable uploadImage" name="edit_avatar" id="edit_avatar" multiple accept=".png, .jpg, .jpeg">    
                                            <script src="js/staff_list/image_preview_table.js"></script>                                       
                                        </p> 
                                        <p><label class="edit_hint">Роль:</label><select class="form-control" name="role" id="role_edit"><option value="1">HR</option><option selected value="2">Сотрудник</option></select></p><br> 
                                        <p><label class="edit_hint">Имя:</label><input type="text" class="form-control" name="first_name" id="first_name_edit"></p><br>                                   
                                        <p><label class="edit_hint">Фамилия:</label><input type="text" class="form-control" name="last_name" id="last_name_edit"></p><br> 
                                        <p><label class="edit_hint">Отчество:</label><input type="text" class="form-control" name="patronymic" id="patronymic_edit"></p><br> 
                                        <p><label class="edit_hint">Логин:</label><input type="text" class="form-control" name="login" id="login_edit"></p><br> 
                                        <p><label class="edit_hint">Пароль:</label><input type="text" class="form-control" name="password" id="password_edit"></p><br> 
                                        <p><label class="edit_hint">Номер телефона:</label><input type="text" class="form-control" name="phone_number" id="phone_number_edit"></p><br> 
                                        <p><label class="edit_hint">E-mail:</label><input type="text" class="form-control" name="email_address" id="email_address_edit"></p><br>
                                        <p><label class="edit_hint">Отдел:</label><input type="text" class="form-control" name="department" id="department_edit" ></p><br>  
                                        <button class="btn-save" id="save_edited_info">Сохранить</button>                                                                                 
                                </form>
                            </div>
                        </div>
                    </div>
                </div>  
                <script src="js/popups.js"></script>
                <script src="js/staff_list/save_edited_info.js"></script>
            <?php endif;
            
            if ($currentRole ==  2): ?>   <!--user-->   
                <!-- nothing( -->
            <?php endif;?>                   
        </div>      
    </div>
</body>
</html>