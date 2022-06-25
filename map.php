<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">    
    <link REL=stylesheet HREF="css/mainMenu_and_bg.css" TYPE="text/css"> 
    <link REL=stylesheet HREF="css/map/map_main_part.css" TYPE="text/css"> 
    <link REL=stylesheet HREF="css/map/to_book_wp_popup.css" TYPE="text/css">      
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
    <script src="https://kit.fontawesome.com/3097d0fe75.js" crossorigin="anonymous"></script> 
    <link rel="stylesheet" href="//code.jquery.com/ui/1.13.1/themes/base/jquery-ui.css">
    <link rel="stylesheet" href="/resources/demos/style.css">
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
    <script src="https://code.jquery.com/ui/1.13.1/jquery-ui.js"></script>
    <script>
        $( function() {
            $( "#datepicker" ).datepicker();
        } );
    </script>    

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
            <div class="wrap_part"></div>
            <!-- add new booking -->
            <div id="popupWorkplaceBookInfo" class="popup">
                <div class="popup_body">
                    <div class="popup_content"> 
                        <div class="popup_text"> 
                            <form class="edit_form" method="post" enctype="multipart/form-data">    
                                <div id="current_workplace_id_for_booking" name='gg'></div>                                                                                        
                                <p class="workplace_location_info"></p> 
                                <p class="wp_info workplace_specification_info"></p> 
                                <p class="wp_info workplace_curr_user_info"></p>  
                                <p class="wp_info history_table_label"><span id="history_label_span">История бронирования</span></p> 
                                <div class=wrap_table>    
                                    <table>
                                        <tr class="table_header" id="table_header">                                        
                                            <th >ФИО</th>
                                            <th >Дата начала</th>
                                            <th >Дата конца</th>
                                        </tr>       
                                        <tbody id="booking_list"></tbody>         
                                    </table>     
                                </div>    
                                <a href="#popupNewBookingWP" class="popup-link">
                                    <button class="btn-save" id="btn_to_book_wp">Забронировать</button> 
                                </a>                                                                         
                            </form>
                        </div>
                    </div>
                </div>
            </div>  
            <div id="popupNewBookingWP" class="popup">
                <div class="popup_body">
                    <div class="popup_content date"> 
                        <div class="popup_text"> 
                            <form class="edit_form" method="post" enctype="multipart/form-data">    
                                <p><label class="edit_hint">Дата начала: </label><input class="form-control" name="start_date" id="start_date"></p>                                   
                                <p><label class="edit_hint">Дата конца: </label><input class="form-control" name="end_date" id="end_date"></p>                                   
                                <!-- <input type="text" id="datepicker2" class="form-control" name="end_date"> -->
                                <button class="btn-save date" id="btn_to_add_new_book_wp">Добавить бронь</button>    
                            </form>
                        </div>
                    </div>
                </div>
            </div>  
            <script src="js/map/map_new_book_wp.js"></script>
            <!--Draggable DIV:-->
            <!-- <div id="mydiv"> -->
                <!--Include a header DIV with the same name as the draggable DIV, followed by "header":-->
                <!-- <div id="mydivheader">Click here to move</div>
                <p>Move</p>
                <p>this</p>
                <p>DIV</p>
            </div>
            <script src="js/testDRAG.js"></script> -->
            <script src="js/map/map_get_offices.js"></script>
            <script type="text/javascript">mapGetOfficeItems();</script> 
            <?php
                require "php/database/role_identification.php";

                if ($currentRole ==  1): ?>   <!--admin-->   
                    <a href="admin_editing_mode.php" class="" id="admin_edit_button">
                    <form class="" action="admin_editing_mode.php">
                        <button class="button_edit_mode_switch">Редактирование</button>
                    </form> 
                </a> 
                <?php endif;

                
                if ($currentRole ==  2): ?>   <!--user-->   
                    <!-- Nothing :/ -->
            <?php endif;?>   
                        
        </div>                 
    </div>
</body>
</html>