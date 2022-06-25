document.getElementById('btn_to_add_new_book_wp').setAttribute('onclick','addNewBooking()');

document.getElementById('btn_to_add_new_book_wp').addEventListener('click', function () {
    event.preventDefault(); // Убираем событие отправки формы (убираем перезагрузку страницы) 
});

document.getElementById('btn_to_book_wp').setAttribute('onclick','showNewBookingForm()');

document.getElementById('btn_to_book_wp').addEventListener('click', function () {
    event.preventDefault(); // Убираем событие отправки формы (убираем перезагрузку страницы) 
});

function showNewBookingForm()
{
    var cur_wp_id = document.getElementById('current_workplace_id_for_booking').name;    
    

    //лотгка для календарей
    //при выборе даты сужать диапазон для противоположного поля в соответствии
    //все даты на которые есть брони для этого компа
    var allBookingForWP;
    var newData = new FormData();
    newData.append("id", cur_wp_id); 
    $.ajax({
        type: "POST",
        url: '/../../php/map/get_all_booking_for_wp.php',
        data: newData,        
        async: false,
        cache: false,
        processData: false,
        success: function (result) { 
            allBookingForWP=JSON.parse(result);            
        },
        error: function (result) { alert(JSON.parse(result));
        },
        contentType: false,
    });
    var disabeledDates = []
    allBookingForWP.forEach(element => {
        disabeledDates.push({from: element[0], to: element[1]});
    });
    //все даты на которые есть брони для этого человека
    var allBookingForUser;
    $.ajax({
        type: "POST",
        url: '/../../php/map/get_all_booking_for_user.php',
        async: false,
        cache: false,
        processData: false,
        success: function (result) { 
            allBookingForUser=JSON.parse(result);            
        },
        error: function (result) { alert(JSON.parse(result));
        },
        contentType: false,
    });
    allBookingForUser.forEach(element => {
        disabeledDates.push({from: element[0], to: element[1]});
    });
    //для старта даты
    $('#start_date').datepicker({
    dateFormat: 'yy-mm-dd',
    showButtonPanel: true,
    changeMonth: true,
    changeYear: true,
    minDate: new Date(), //все даты раньше сегодняшнего дня
    maxDate: '+1Y',      //все даты позже сегодняяшнего дня + 1 год
    inline: true,
    beforeShowDay: function(date){
        var timestamp = date.getTime() 
        return [!disabeledDates.some(range=>
        timestamp <= new Date(range.to).getTime() &&
        timestamp >= new Date(range.from + ' 00:00').getTime()
        )]
    },
    onSelect : function(dateText, inst){ 
        var curDate = new Date(dateText);
        var maxDate = new Date(dateText);
        maxDate.setMonth(maxDate.getMonth() + 1)
        //проверка выбранного диапазона на пересекающиеся даты 
        for (let index=0;index<disabeledDates.length; index++)
        {
            var fromDate = new Date(disabeledDates[index].from);
            var toDate = new Date(disabeledDates[index].to);
            if (curDate<fromDate && curDate<toDate && maxDate>fromDate && maxDate>toDate)
            {
                maxDate=fromDate;
                break;
            }
        }
        var textMaxDate=maxDate.getFullYear()+'-'+(maxDate.getMonth()+1)+'-'+maxDate.getDate();
        $('#end_date').datepicker('option', 'minDate', dateText);
        $('#end_date').datepicker('option', 'maxDate', textMaxDate);        
    }
});
//для конца даты
//все даты позже сегодняяшнего дня + 1 год
//все даты на которые есть брони для этого компа
//все даты на которые есть брони для этого человека
$('#end_date').datepicker({
    dateFormat: 'yy-mm-dd',
    showButtonPanel: true,
    changeMonth: true,
    changeYear: true,
    minDate: new Date(), //все даты раньше сегодняшнего дня
    maxDate: '+1Y',      //все даты позже сегодняяшнего дня + 1 год
    inline: true,
    beforeShowDay: function(date){
        var timestamp = date.getTime() 
        return [!disabeledDates.some(range=>
        timestamp <= new Date(range.to).getTime() &&
        timestamp >= new Date(range.from + ' 00:00').getTime()
        )]
    },
    onSelect : function(dateText, inst){
        var curDate = new Date(dateText);
        var minDate = new Date(dateText);
        minDate.setMonth(minDate.getMonth() - 1)
        //проверка выбранного диапазона на пересекающиеся даты 
        for (let index=0;index<disabeledDates.length; index++)
        {
            var fromDate = new Date(disabeledDates[index].from);
            var toDate = new Date(disabeledDates[index].to);
            if (curDate>fromDate && curDate>toDate && minDate<fromDate && minDate<toDate)
            {
                minDate=toDate;
                break;
            }
        }

        var textMinDate=minDate.getFullYear()+'-'+(minDate.getMonth()+1)+'-'+minDate.getDate();
        $('#start_date').datepicker('option', 'minDate', textMinDate);
        $('#start_date').datepicker('option', 'maxDate', dateText);
    }
});

    

    
}

function addNewBooking()
{        
    // получить id 
    var cur_wp_id = document.getElementById('current_workplace_id_for_booking').name;
    var startDate = $( "#start_date" ).datepicker( "getDate" );
    var endDate = $( "#end_date" ).datepicker( "getDate" );

    if (!startDate || !endDate)
        alert("Выберите промежуток для бронирования!");
    var startDateText = startDate.getFullYear()+'-'+(startDate.getMonth()+1)+'-'+startDate.getDate();
    var endDateText = endDate.getFullYear()+'-'+(endDate.getMonth()+1)+'-'+endDate.getDate();
    //НЕМНОГО КРИВО ПРЕОБРАЗУЕТ, ЕСЛИ ЧТО ПОФИКСИТЬ!!!!    
    //сохраняем в бд!
    var newData = new FormData();
    newData.append("id", cur_wp_id); 
    newData.append("startDate", startDateText); 
    newData.append("endDate", endDateText); 
    
    $.ajax({
        type: "POST",
        url: '/../../php/map/save_new_booking.php',
        data: newData,        
        async: false,
        cache: false,
        processData: false,
        success: function (result) { 
           info=JSON.parse(result);    
           alert(info);
           if (info="Добавлено!")   
                location.reload();     
        },
        error: function (result) { alert(JSON.parse(result));
        },
        contentType: false,
    });
    
    //в новом попапе сделать доступными для выбора только даты, соответствующие проверкам?????
    //или просто писать ошибки после проверок(если первое сложно)
}