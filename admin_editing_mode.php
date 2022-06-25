<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">    
    <link REL=stylesheet HREF="css/mainMenu_and_bg.css" TYPE="text/css"> 
    <link REL=stylesheet HREF="css/map/map_main_part.css" TYPE="text/css"> 
    <link REL=stylesheet HREF="css/map/admin_edit_tabs.css" TYPE="text/css">  
    <link REL=stylesheet HREF="css/map/office_popup.css" TYPE="text/css">
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
                endif; 
                //<!--если пользователь зашёл на эту страницу редирект на карту--> 
            require "php/database/role_identification.php";  
            if ($currentRole ==  2): // <!--user-->   
                    header('Location: /map.php'); 
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
            <div class="tabs">
                <div class="tab-2">
                    <label for="tab2-1">Офисы</label>
                    <input id="tab2-1" name="tabs-two" type="radio" checked="checked">
                    <div > 
                        <div class=wrap_table>
                            <table>
                                <tr class="table_header" id="table_header_offices">
                                    <td class="btn-column"></td>
                                    <td class="btn-column"></td>
                                    <td class="btn-column"></td>
                                    <td >№</td>
                                    <td >Этаж</td>
                                    <td >Номер</td>
                                </tr>  
                                <tbody id="office_list"></tbody>                             
                            </table>
                        </div>
                                              
                        <a href="#popupOfficeAdd" class="popup-link">
                            <form class="form_add_office popup-link" method="post" action="#popupOfficeAdd">
                                <button class="button_add_office btn-add popup-link" type="submit">Добавить</button>
                            </form> 
                        </a>
                        <!-- workplaces edit -->
                        <div id="popupWpMapEdit" class="popup">
                            <div class="popup_body">
                                <div class="popup_content"> 
                                    <div class="popup_text"> 
                                        <form class="add_new_form" method="post" enctype="multipart/form-data"> 
                                            <div class="wrap_part"></div>                                                                             
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>  
                        <!--add new -->
                        <div id="popupOfficeAdd" class="popup">
                            <div class="popup_body">
                                <div class="popup_content"> 
                                    <div class="popup_text"> 
                                        <form class="add_new_form" method="post" enctype="multipart/form-data"> 
                                            <p>
                                                <img src="office_schemes/default.jpg" id = "office_scheme_add_new" class="office_scheme_add_new office_scheme_image" alt="Схема">
                                                <input type="file" class="uploadImageAddNewScheme uploadImage" name="add_new_scheme" id="add_new_scheme" multiple accept=".png, .jpg, .jpeg">    
                                                <script src="js/admin_edit_mode/admin_add_new_office_image_preview.js"></script>                                       
                                            </p>                                               
                                            <p><label class="edit_hint">Этаж:</label><input type="text" class="form-control" name="floor" id="floor" ></p><br>                                   
                                            <p><label class="edit_hint">Номер офиса:</label><input type="text" class="form-control" name="number" id="number" ></p><br>                                   
                                            <button class="btn-save" id="btn_add_new_office">Сохранить</button>                                                                                 
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>  
                        <script src="js/admin_edit_mode/admin_add_new_office.js"></script>
                        <!-- edit one -->
                        <div id="popupOfficeEdit" class="popup">
                            <div class="popup_body">
                                <div class="popup_content"> 
                                    <div class="popup_text"> 
                                        <form class="edit_form" method="post" enctype="multipart/form-data">    
                                            <div id="current_office_id_for_edit" name='gg'></div> 
                                            <p>
                                                <img src="office_schemes/default.jpg" id = "office_scheme_edit_one" class="office_scheme_edit_one office_scheme_image" alt="Схема">
                                                <input type="file" class="uploadImageEditOneScheme uploadImage" name="edit_one_scheme" id="edit_one_scheme" multiple accept=".png, .jpg, .jpeg">    
                                                <script src="js/admin_edit_mode/admin_edit_one_office_image_preview.js"></script>                                       
                                            </p>                                           
                                            <p><label class="edit_hint">Этаж:</label><input type="text" class="form-control" name="floor_edit" id="floor_edit" ></p><br>                                   
                                            <p><label class="edit_hint">Номер офиса:</label><input type="text" class="form-control" name="number_edit" id="number_edit" ></p><br>                                   
                                            <button class="btn-save" id="btn_edit_office">Сохранить</button>                                                                                 
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>  
                        <script src="js/admin_edit_mode/admin_save_edited_office.js"></script>
                        <!-- fill office table -->
                        <script src="js/admin_edit_mode/admin_offices_items.js"></script>
                        <script type="text/javascript">getOfficeItems();</script> 
                    </div>                    
                </div>
                <div class="tab-2">
                    <label for="tab2-2">Рабочие места</label>
                    <input id="tab2-2" name="tabs-two" type="radio">
                    <div > 
                        <div class=wrap_table>
                            <table>
                                <tr class="table_header" id="table_header_workplaces">
                                    <td class="btn-column"></td>
                                    <td class="btn-column"></td>
                                    <td >№</td>
                                    <td >Расположение</td>
                                    <td >Спецификация</td>
                                    <td >Номер стола</td>
                                </tr>   
                                <tbody id="workplaces_list"></tbody>                          
                            </table>
                        </div>
                        <script src="js/admin_edit_mode/admin_workplaces_items.js"></script>
                        <script type="text/javascript">getWorkplaceItems();</script>
                        <a href="#popupWorkplaceAdd" class="popup-link">
                            <form class="form_add_workplace popup-link" method="post" action="#popupWorkplaceAdd">
                                <button class="button_add_workplace btn-add popup-link" id="button_add_workplace">Добавить</button>
                            </form> 
                        </a>
                        <!--add new -->
                        <div id="popupWorkplaceAdd" class="popup">
                            <div class="popup_body">
                                <div class="popup_content"> 
                                    <div class="popup_text"> 
                                        <form class="add_new_form" method="post" enctype="multipart/form-data">  
                                            <p><label class="edit_hint">Расположение:</label><select class="form-control" name="location" id="location"><option disabled>Выберите офис</option></select></p><br>                                                                                     
                                            <p><label class="edit_hint">Спецификация:</label><input type="text" class="form-control" name="specifications" id="specifications" ></p><br>                                   
                                            <p><label class="edit_hint">Номер стола:</label><input type="text" class="form-control" name="wp_number" id="wp_number" ></p><br>                                   
                                            <button class="btn-save" id="btn_add_new_workplace">Сохранить</button>                                                                                 
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>  
                        <script src="js/admin_edit_mode/admin_add_new_workplace.js"></script>
                        <script src="js/admin_edit_mode/admin_display_form_add_new_workplace.js"></script>
                        <!-- edit one -->
                        <div id="popupWorkPlaceEdit" class="popup">
                            <div class="popup_body">
                                <div class="popup_content"> 
                                    <div class="popup_text"> 
                                        <form class="edit_form" method="post" enctype="multipart/form-data">    
                                            <div id="current_workplace_id_for_edit" name='gg'></div>                                           
                                            <p><label class="edit_hint">Расположение:</label><select class="form-control" name="location_edit" id="location_edit"><option disabled>Выберите офис</option></select></p><br>                                                                                     
                                            <p><label class="edit_hint">Спецификация:</label><input type="text" class="form-control" name="specifications_edit" id="specifications_edit" ></p><br>                                   
                                            <p><label class="edit_hint">Номер стола:</label><input type="text" class="form-control" name="wp_number_edit" id="wp_number_edit" ></p><br>                                   
                                            <button class="btn-save" id="btn_edit_workplace">Сохранить</button>                                                                                 
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>  
                        <script src="js/admin_edit_mode/admin_save_edited_workplace.js"></script>
                    </div>
                </div>                
            </div>        
            <script src="js/popups.js"></script> 
            <a href="map.php" class="popup-link">
                <form class="popup-link" action="map.php">
                    <button class="button_edit_mode_switch popup-link">Завершить редактирование</button>
                </form>   
            </a> 
        </div>                 
    </div>
</body>
</html>