function getAccountBookingItems()
{
    var booking_list;
    $.ajax({
        url:'/../../php/account/account_get_booking_table.php',
        async: false,
        success: function(data) {
            booking_list = JSON.parse(data);
        }
    }); 
    const tBody = document.getElementById('account_booking_list');
    //очищаем таблицу перед созданием
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }
    ////////////////////
    const button = document.createElement('button');
    const icon = document.createElement('i');  
    for (var i =0;i<booking_list.length;i++)
    {
        var curDate=new Date();
        var startDate=new Date(booking_list[i][4]);
        var endDate=new Date(booking_list[i][5]);

        let editButton = button.cloneNode(false);
        let editIcon = icon.cloneNode(false);
        editIcon.classList.add('fa-regular');
        editIcon.classList.add('fa-pen-to-square');
        editButton.setAttribute('onclick','displayAccountBoookingEditForm(' + booking_list[i][0] + ', '+booking_list[i][7]+')');
        editButton.appendChild(editIcon); 
        
        let deleteButton = button.cloneNode(false);
        let deleteIcon = icon.cloneNode(false);
        deleteIcon.classList.add('fa-regular');
        deleteIcon.classList.add('fa-trash-can');
        deleteButton.setAttribute('onclick','deleteAccountBookingItem(' + booking_list[i][0] + ', '+(startDate<=curDate && curDate<=endDate) +')');
        deleteButton.appendChild(deleteIcon);       

        var idNode = document.createTextNode(booking_list[i][0]);
        var locationNode = document.createTextNode("Этаж "+booking_list[i][1]+", офис "+booking_list[i][2]+", стол "+booking_list[i][3]);
                
        var startDateNode;
        if (booking_list[i][4][0]!='3')
            startDateNode = document.createTextNode(booking_list[i][4]);
        else
            startDateNode = document.createTextNode('Перманентно');

        var endDateNode;
        if(booking_list[i][5][0]!='3')
            endDateNode = document.createTextNode(booking_list[i][5]);
        else
            endDateNode = document.createTextNode('Перманентно');

        let tr = tBody.insertRow();
        tr.classList.add('table_cell');
        
        if (booking_list[i][6]=='1' || (curDate>=endDate)) 
        {
            if (booking_list[i][6]=='1')
                tr.classList.add('permanently');
            let emptyNode = document.createTextNode('');
            let td0 = tr.insertCell(0);
            td0.appendChild(emptyNode);
            let td1 = tr.insertCell(1);
            td1.appendChild(emptyNode);
        }       
        else
        {
            //добавляем кнопки
            let td0 = tr.insertCell(0);
            td0.appendChild(editButton);
            td0.classList.add('edit-btn');
            td0.classList.add('btn-column');
            
            let td1 = tr.insertCell(1);
            td1.appendChild(deleteButton);        
            td1.classList.add('delete-btn');   
            td1.classList.add('btn-column');    
        }
             

        let td2 = tr.insertCell(2);
        td2.appendChild(idNode);

        let td3 = tr.insertCell(3);
        td3.appendChild(locationNode);

        let td4 = tr.insertCell(4);
        td4.appendChild(startDateNode);

        let td5 = tr.insertCell(5);
        td5.appendChild(endDateNode);
    }
}

function deleteAccountBookingItem(id, IsCurBooking)
{
    //спрашиваем уверены ли в удалении
    if (confirm("Удалить?"))
    {                   
        if (IsCurBooking)
            alert("Бронь будет закрыта сегодняшним днём")
        //удаляем DELETE PHP        
        $.ajax({
            type: "POST",
            url: '/../../php/account/account_delete_booking.php',
            data: {'id':id},
            success: function (result) {
                //релоад таблицу  
                alert(JSON.parse(result));                
                getAccountBookingItems();
            },
            error: function (result) {
                alert(result);
            },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
          });            
    }
}
function displayAccountBoookingEditForm(bookingId, wpId)
{      
    //кароче просто из списка заблоченых дат убрать текущую бронь и пусть бронирует сколько влезет
    var allBookingForWP;
    var newData = new FormData();
    newData.append("bookingId", bookingId);     
    newData.append("wpId", wpId); 
    $.ajax({
        type: "POST",
        url: '/../../php/account/get_all_booking_for_wp.php',
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
        url: '/../../php/account/get_all_booking_for_user.php',
        data: newData,        
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




    //кнопку для сохранения 
    document.getElementById('btn_to_add_new_book_wp').setAttribute('onclick','editBooking('+bookingId+')');

    document.getElementById('btn_to_add_new_book_wp').addEventListener('click', function () {
        event.preventDefault(); // Убираем событие отправки формы (убираем перезагрузку страницы) 
    });
    popupOpen(document.getElementById('popupEditBookingUser'));
}

function editBooking(id)
{
    var startDate = $( "#start_date" ).datepicker( "getDate" );
    var endDate = $( "#end_date" ).datepicker( "getDate" );

    if (!startDate || !endDate)
        alert("Выберите промежуток для бронирования!");
    var startDateText = startDate.getFullYear()+'-'+(startDate.getMonth()+1)+'-'+startDate.getDate();
    var endDateText = endDate.getFullYear()+'-'+(endDate.getMonth()+1)+'-'+endDate.getDate();
    //НЕМНОГО КРИВО ПРЕОБРАЗУЕТ, ЕСЛИ ЧТО ПОФИКСИТЬ!!!!    
    //сохраняем изменения в бд!
    var newData = new FormData();
    newData.append("id", id); 
    newData.append("startDate", startDateText); 
    newData.append("endDate", endDateText); 
    
    $.ajax({
        type: "POST",
        url: '/../../php/account/save_edited_booking.php',
        data: newData,        
        async: false,
        cache: false,
        processData: false,
        success: function (result) { 
            info=JSON.parse(result);    
            alert(info);
            if (info="Сохранено!")   
                getAccountBookingItems();
        },
        error: function (result) { alert(JSON.parse(result));
        },
        contentType: false,
    });
    popupClose(document.getElementById('popupEditBookingUser'));
}