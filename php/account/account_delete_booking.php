<?php    
    try 
    {           
        $bookingId = trim($_POST['id']);    
        require __DIR__."/../database/connect.php";
        //проверка если эта бронь текущая, то дату конца ставим сегодня, если эта бронь будущая то просто удаляем её из бд        
        $sqlResult = $mysql->query("
        SELECT * FROM `booking_list` WHERE booking_list.id='$bookingId'");  
        $curBooking = $sqlResult->fetch_array();
        $startDate=$curBooking[3];
        $endDate=$curBooking[4];
        $curDate=date("Y-m-d");
        if ($startDate <= $curDate && $curDate<=$endDate)
        {
            $mysql->query("
            UPDATE `booking_list` SET booking_list.end_time='$curDate', booking_list.IsPermanently='0' WHERE booking_list.id='$bookingId'"); 
        }
        else
        {
            $mysql->query("
            DELETE FROM `booking_list` WHERE booking_list.id='$bookingId'"); 
        }
        $mysql->close();
        //выводим удалено!
        require __DIR__."/../database/dateCheck.php";
        die(json_encode("Удалено!", JSON_UNESCAPED_UNICODE));
    } 
    catch (Throwable $th) 
    {        
        //ошибка об неправильности
        die(json_encode("Ошибка!", JSON_UNESCAPED_UNICODE));
    }  
    
?>