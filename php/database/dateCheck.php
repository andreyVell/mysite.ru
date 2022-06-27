<?php 
    require __DIR__."/connect.php";
    //ДЛЯ ВСЕХ СТОЛОВ: корректируем IsBusy и Ispermanently для текущей даты

    //реализация    
    //для всех столов ставим IsBusy = 0 и Ispermanently = 0
    $mysql->query("UPDATE `workplaces` SET workplaces.IsBusy = '0', workplaces.wpIsPermanently='0'");
    //проходим по всему списку бронирования, если текущая дата попадает в диаппазон брони, то ставим столу IsBusy =1
    // если ещё и запись IsPermanently ставим столу соответствующий тег
    $sqlResult= $mysql->query("
        SELECT  
            booking_list.workplaсe_id,            
            booking_list.start_time,
            booking_list.end_time,
            booking_list.IsPermanently
        FROM `booking_list`            
            WHERE booking_list.end_time>=CURRENT_DATE()
            ORDER BY booking_list.start_time DESC");    
    $curInfo = mysqli_fetch_all($sqlResult);
    foreach($curInfo as $value)
    {   
        $curwpID=$value[0];
        $curDate=date('Y-m-d');
        if ($value[1]<=$curDate && $curDate<=$value[2])
        {
            //обновляем IsBusy у стола
            $mysql->query("UPDATE `workplaces` SET workplaces.IsBusy = '1' WHERE workplaces.id='$curwpID'");
            if ($value[3]=='1')
                //обновляем Ispermanently у стола
                $mysql->query("UPDATE `workplaces` SET workplaces.wpIsPermanently = '1' WHERE workplaces.id='$curwpID'");
        }
    }
    $mysql->close();
?>