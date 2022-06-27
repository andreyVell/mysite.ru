function getItems()
{
    var staff_list;
    $.ajax({
        url:'/../../php/staff_list/get_table.php',
        async: false,
        success: function(data) {
            staff_list = JSON.parse(data);
        }
    }); 
    
    var curr_role;
    $.ajax({
        url:'/../../php/staff_list/get_currRole.php',
        async: false,
        success: function(data) {
            curr_role = JSON.parse(data);
        }
    });    

    if (curr_role==2)
    {
        //удаляем первые два th
        let tHeader = document.getElementById('table_header');
        tHeader.removeChild(tHeader.firstChild);
        tHeader.removeChild(tHeader.firstChild);        
        tHeader.removeChild(tHeader.firstChild);
        tHeader.removeChild(tHeader.firstChild);
        tHeader.removeChild(tHeader.firstChild);
        tHeader.removeChild(tHeader.firstChild);
    }
    const tBody = document.getElementById('staff_list');
    //очищаем таблицу перед созданием
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }
    const button = document.createElement('button');
    const icon = document.createElement('i');
    const a = document.createElement('a');
    const form = document.createElement('form');   
    for (var i =0;i<staff_list.length;i++)
    {
        let editButton = button.cloneNode(false);
        let editIcon = icon.cloneNode(false);
        editIcon.classList.add('fa-regular');
        editIcon.classList.add('fa-pen-to-square');
        editButton.setAttribute('onclick','displayEditForm(' + staff_list[i][[0]] + ')');
        editButton.appendChild(editIcon);       
        
        let editA = a.cloneNode(false);
        //задаём свой-ва editA
        editA.classList.add('popup-link');
        editA.href='#popupInfoEdit';
        let editForm = form.cloneNode(false);
        //задаём свой-ва editForm
        editForm.classList.add('popup-link');
        editForm.action='#popupInfoEdit';
        //задаём сво-ства editButton
        editButton.classList.add('popup-link');
        editForm.appendChild(editButton);
        editA.appendChild(editForm);



        let deleteButton = button.cloneNode(false);
        let deleteIcon = icon.cloneNode(false);
        deleteIcon.classList.add('fa-regular');
        deleteIcon.classList.add('fa-trash-can');
        deleteButton.setAttribute('onclick','deleteItem(' + staff_list[i][[0]] + ')');
        deleteButton.appendChild(deleteIcon);

        let bookingButton = button.cloneNode(false);
        let bookingIcon = icon.cloneNode(false);
        bookingIcon.classList.add('fa-solid');
        bookingIcon.classList.add('fa-receipt');
        bookingButton.setAttribute('onclick','openBookingHistory(' + staff_list[i][[0]] + ', true)');
        bookingButton.appendChild(bookingIcon);

        let idNode = document.createTextNode(staff_list[i][0]);
        let last_nameNode = document.createTextNode(staff_list[i][2]);
        let first_nameNode = document.createTextNode(staff_list[i][3]);
        let patronymicNode = document.createTextNode(staff_list[i][4]);        
        let phone_numberNode = document.createTextNode(staff_list[i][5]);
        let emailNode = document.createTextNode(staff_list[i][6]);
        let departmentNode = document.createTextNode(staff_list[i][9]);
        let workplaceNode;
        if (staff_list[i][10]==null || staff_list[i][11]==null || staff_list[i][12]==null)
            workplaceNode = document.createTextNode('---');
        else
            workplaceNode = document.createTextNode("Этаж "+staff_list[i][10]+", офис "+staff_list[i][11]+", стол "+staff_list[i][12]);
        let tr = tBody.insertRow();
        tr.classList.add('table_cell');
        let cellindex = -3;
        if (curr_role ==1 )
        {
            let td0 = tr.insertCell(0);
            td0.appendChild(editA);
            td0.classList.add('edit-btn');

            let td1 = tr.insertCell(1);
            td1.appendChild(deleteButton);        
            td1.classList.add('delete-btn');

            let td2 = tr.insertCell(2);
            td2.appendChild(bookingButton);        
            td2.classList.add('booking-btn');

            cellindex=0;
        }

        let td3 = tr.insertCell(3 + cellindex);
        td3.appendChild(idNode);

        let td4 = tr.insertCell(4 + cellindex);
        td4.appendChild(last_nameNode);

        let td5 = tr.insertCell(5 + cellindex);
        td5.appendChild(first_nameNode);

        let td6 = tr.insertCell(6 + cellindex);
        td6.appendChild(patronymicNode);

        let td7 = tr.insertCell(7 + cellindex);
        td7.appendChild(departmentNode);

        let td8 = tr.insertCell(8 + cellindex);
        td8.appendChild(workplaceNode);

        let td9 = tr.insertCell(9 + cellindex);
        td9.appendChild(phone_numberNode);

        let td10 = tr.insertCell(10 + cellindex);
        td10.appendChild(emailNode);
    }
}

function deleteItem(id)
{
    //спрашиваем уверены ли в удалении
    if (confirm("Удалить?"))
    {        
        var currentID;
        $.ajax({
            url:'/../../php/staff_list/get_currentID.php',
            async: false,
            success: function(data) {
                currentID = JSON.parse(data);
            }
        });    
        //удаляем DELETE PHP        
        $.ajax({
            type: "POST",
            url: '/../../php/staff_list/delete_employee.php',
            data: {'id':id},
            success: function (result) {
                //релоад таблицу  
                alert("Удалено!");
                if (currentID==id) 
                    location.reload();
                else
                    getItems();
            },
            error: function (result) {
                alert(result);
            },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
          });              
    }
}
function displayEditForm(id)
{
    //получить все згначения Placeholdera для текущего IDc
    var curInfo;     
    $.ajax({
        type: "POST",
        url: '/../../php/staff_list/get_currentInfoViaID.php',
        data: {'id':id},
        success: function (result) {            
            curInfo = JSON.parse(result);
            var curId=curInfo[0];
            var curLogin=curInfo[1];
            var curPassword=curInfo[2];
            var curImage=curInfo[3];
            var curRole=curInfo[4];
            var curFirst_name=curInfo[5];
            var curLast_name=curInfo[6];
            var curPatronymic=curInfo[7];
            var curPhone_number=curInfo[8];
            var curEmail=curInfo[9];
            var curDepartment=curInfo[10];
            //подогнать значения placeholdera под текущий ID
            document.getElementById('current_id_for_edit').setAttribute('name', curId);
            document.getElementById('avatar_edit_note').src=curImage;
            document.getElementById('role_edit').value=curRole;
            document.getElementById('login_edit').placeholder=curLogin;
            document.getElementById('first_name_edit').placeholder=curFirst_name;
            document.getElementById('last_name_edit').placeholder=curLast_name;
            document.getElementById('patronymic_edit').placeholder=curPatronymic;
            document.getElementById('phone_number_edit').placeholder=curPhone_number;
            document.getElementById('email_address_edit').placeholder=curEmail;
            document.getElementById('department_edit').placeholder=curDepartment;
        },
        error: function (result) {
            alert('error');
        },
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
        });
    
}

function openBookingHistory(userID, needToPopupOpen)
{    
    //подгоняем инфу под конкретного юзера
    var cur_user_booking_list;
    var newData = new FormData();
    newData.append("id", userID);  
    $.ajax({
        type: "POST",
        url:'/../../php/staff_list/user_get_booking_table.php',        
        data: newData,        
        async: false,
        cache: false,
        processData: false,
        success: function(data) {
            cur_user_booking_list = JSON.parse(data);
        },
        contentType: false,
    }); 
    const tBody = document.getElementById('staff_list_account_booking_list');
    //очищаем таблицу перед созданием
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }
    ////////////////////
    const button = document.createElement('button');
    const icon = document.createElement('i');  
    
    for (var i =0;i<cur_user_booking_list.length;i++)
    {
        var curDate=new Date();
        var startDate=new Date(cur_user_booking_list[i][4]);
        var endDate=new Date(cur_user_booking_list[i][5]);

        let editButton = button.cloneNode(false);
        let editIcon = icon.cloneNode(false);
        editIcon.classList.add('fa-regular');
        editIcon.classList.add('fa-pen-to-square');
        editButton.setAttribute('onclick','displayCurrAccountBoookingEditForm('+ userID + ', '+ cur_user_booking_list[i][0] + ', '+cur_user_booking_list[i][7]+', '+cur_user_booking_list[i][6]+')');
        editButton.appendChild(editIcon); 
        
        let deleteButton = button.cloneNode(false);
        let deleteIcon = icon.cloneNode(false);
        deleteIcon.classList.add('fa-regular');
        deleteIcon.classList.add('fa-trash-can');
        deleteButton.setAttribute('onclick','deleteCurrAccountBookingItem(' + cur_user_booking_list[i][0] + ', '+(startDate<=curDate && curDate<=endDate) +', '+userID+')');
        deleteButton.appendChild(deleteIcon);       

        var idNode = document.createTextNode(cur_user_booking_list[i][0]);
        var locationNode = document.createTextNode("Этаж "+cur_user_booking_list[i][1]+", офис "+cur_user_booking_list[i][2]+", стол "+cur_user_booking_list[i][3]);
                
        var startDateNode;
        if (cur_user_booking_list[i][4][0]!='3')
            startDateNode = document.createTextNode(cur_user_booking_list[i][4]);
        else
            startDateNode = document.createTextNode('Перманентно');

        var endDateNode;
        if(cur_user_booking_list[i][5][0]!='3')
            endDateNode = document.createTextNode(cur_user_booking_list[i][5]);
        else
            endDateNode = document.createTextNode('Перманентно');

        let tr = tBody.insertRow();
        tr.classList.add('table_cell');
        //если перманентная и текущая то удалить
        //если перманентная и будущая то удалить и изменить0
        if (cur_user_booking_list[i][6]=='1' || (curDate>=endDate)) 
        {
            if (cur_user_booking_list[i][6]=='1')
            {
                tr.classList.add('permanently');
                if (startDate<=curDate && curDate<=endDate)
                {
                    let emptyNode = document.createTextNode('');
                    let td0 = tr.insertCell(0);
                    td0.appendChild(emptyNode);
                    let td1 = tr.insertCell(1);
                    td1.appendChild(deleteButton);        
                    td1.classList.add('delete-btn');   
                    td1.classList.add('btn-column'); 
                }
                if (startDate>curDate)
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
            }
            else
            {
                let emptyNode = document.createTextNode('');
                let td0 = tr.insertCell(0);
                td0.appendChild(emptyNode);
                let td1 = tr.insertCell(1);
                td1.appendChild(emptyNode);
            }
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
    if (needToPopupOpen)
        popupOpen(document.getElementById('popupCurUserBookingHistory'));


    document.getElementById('add_new_booking_for_curr_user').setAttribute('onclick','displayCurrAccountAddNewBooking('+userID+')');
    document.getElementById('add_new_booking_for_curr_user').addEventListener('click', function () {
        event.preventDefault(); // Убираем событие отправки формы  
    });
}

function displayCurrAccountBoookingEditForm(curUserId, bookingId, wpId, isPermanently)
{    
    //кароче просто из списка заблоченых дат убрать текущую бронь и пусть бронирует сколько влезет
    var allBookingForWP;
    var newData = new FormData();
    newData.append("bookingId", bookingId);     
    newData.append("wpId", wpId); 
    newData.append("curUserId", curUserId); 
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
        url: '/../../php/staff_list/get_all_booking_for_current_user.php',
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
    if (isPermanently)
    {
        //можно выбрать стартовую дату, где впереди нет ни одной брони
        //ищем самую большую to в disabeledDates
        var max="1000-01-01";
        disabeledDates.forEach(curElement => {
            if (curElement.to>max)
                max=curElement.to;
        });        
        //добавляем в конец промежуток с 1000-01-01 до это самой большой даты
        disabeledDates.push({from: '1000-01-01', to: max});
    }
    //для старта даты
    $('#start_date_edit').datepicker({
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
            $('#end_date_edit').datepicker('option', 'minDate', dateText);
            $('#end_date_edit').datepicker('option', 'maxDate', textMaxDate);        
        }
    });
    //для конца даты
    //все даты позже сегодняяшнего дня + 1 год
    //все даты на которые есть брони для этого компа
    //все даты на которые есть брони для этого человека
    $('#end_date_edit').datepicker({
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
            $('#start_date_edit').datepicker('option', 'minDate', textMinDate);
            $('#start_date_edit').datepicker('option', 'maxDate', dateText);
        }
    });
    
    if (isPermanently)
        document.getElementById('end_date_edit_p').style.display='none';
    else
        document.getElementById('end_date_edit_p').style.display='inline';




    //кнопку для сохранения 
    document.getElementById('btn_to_save_edit_book_user').setAttribute('onclick','saveEditedBooking('+bookingId+', '+isPermanently +', '+curUserId+')');

    document.getElementById('btn_to_save_edit_book_user').addEventListener('click', function () {
        event.preventDefault(); // Убираем событие отправки формы (убираем перезагрузку страницы) 
    });
    popupOpen(document.getElementById('popupChoosenUserChoosenBookingEdit'), false);
}

function deleteCurrAccountBookingItem(bookingId, IsCurBooking, curUserId)
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
            data: {'id':bookingId},
            success: function (result) {
                //релоад таблицу  
                alert(JSON.parse(result));                
                openBookingHistory(curUserId, false);
            },
            error: function (result) {
                alert(result);
            },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
          });            
    }
}

function saveEditedBooking(bookingId, isPermanently, curUserId)
{
    var startDate = $( "#start_date_edit" ).datepicker( "getDate" );
    var endDate = $( "#end_date_edit" ).datepicker( "getDate" );
    if (isPermanently)
        endDate='3000-01-01';
    if (!startDate || !endDate)
        {alert("Выберите промежуток для бронирования!"); return;}
    var startDateText = startDate.getFullYear()+'-'+(startDate.getMonth()+1)+'-'+startDate.getDate();
    var endDateText;
    if (!isPermanently)
        endDateText = endDate.getFullYear()+'-'+(endDate.getMonth()+1)+'-'+endDate.getDate();
    else
        endDateText='3000-01-01';
    //НЕМНОГО КРИВО ПРЕОБРАЗУЕТ, ЕСЛИ ЧТО ПОФИКСИТЬ!!!!    
    //сохраняем изменения в бд!
    var newData = new FormData();
    newData.append("id", bookingId); 
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
            openBookingHistory(curUserId, false);
            popupClose(document.getElementById('popupChoosenUserChoosenBookingEdit'));
        },
        error: function (result) { alert(JSON.parse(result));
        },
        contentType: false,
    });    
}

function displayCurrAccountAddNewBooking(userID)
{
    //подгоняем всю инфу

    //выбираем офис
    //вставить нужные option в select
    let locationSelect = document.getElementById('location_add_new_booking');
    //получаем список офисов для выбора
    var office_list;
    $.ajax({
        url:'/../../php/admin_edit_mode/admin_get_office_table.php',
        async: false,
        success: function(data) {
            office_list = JSON.parse(data);
        }
    }); 
    //очищаем селект перед вставкой (кроме дефолтного значения выберите офис) 
    while(locationSelect.firstChild)
        locationSelect.removeChild(locationSelect.firstChild);
    //формируем option и добавляем в select
    
    const option = document.createElement('option');
    let disOption = option.cloneNode(false);
    disOption.innerHTML='Выберите офис';
    disOption.disabled='1';
    locationSelect.appendChild(disOption);
    for (var i =0;i<office_list.length;i++)
    {        
        let curOption = option.cloneNode(false);
        curOption.innerHTML="Этаж "+office_list[i][1]+", офис "+office_list[i][2];
        curOption.setAttribute("value",office_list[i][0]);
        locationSelect.appendChild(curOption);        
    }
    //как выбрали офис подгоняем стол
    locationSelect.addEventListener('onchange',showWpForCurOffice(locationSelect.value, userID));    
    $('#location_add_new_booking').on('change',function(){
        showWpForCurOffice(locationSelect.value, userID);
    });
  
    
    //галочка перманентно нет
    $('#is_permanently_add_new_booking').on('change',function(){
        if (document.getElementById('is_permanently_add_new_booking').checked)
        {
            document.getElementById('end_date_add_p').style.display='none';
            showWpForCurOffice(locationSelect.value, userID, true);
        }
        else
        {
            document.getElementById('end_date_add_p').style.display='block';
            document.getElementById('end_date_add_p').style.marginTop='15px';
            showWpForCurOffice(locationSelect.value, userID, false);
        }
    });
    //дата начала подгоняем
    //дата конца подгоняем    

    //открываем попапчик новенький-готовенький
    popupOpen(document.getElementById('popupchoosenUserAddNewBooking'), false);
    document.getElementById('btn_add_new_booking_for_cur_user').setAttribute('onclick','addNewBookingForCurUser('+userID+')');
    document.getElementById('btn_add_new_booking_for_cur_user').addEventListener('click', function () {
        event.preventDefault(); // Убираем событие отправки формы  
    });
}

function showWpForCurOffice(officeId, userID, isPermanently = false)
{
    //как выбрали офис подгоняем стол
    var wpSelect = document.getElementById('wp_add_new_booking');
    //получаем всю инфу об рабочих местах в этом офисе
    var newCurWorkplacesData = new FormData();
    newCurWorkplacesData.append("id", officeId); 
    var curOfficeWorkplacesInfo;    
    $.ajax({
        type: "POST",
        url: '/../../php/map/map_get_workplaces_in_cur_office.php',
        data: newCurWorkplacesData,        
        async: false,
        cache: false,
        processData: false,
        success: function (result) { 
            curOfficeWorkplacesInfo=JSON.parse(result);            
        },
        error: function (result) { alert(JSON.parse(result));
        },
        contentType: false,
    });    
    //очищаем селект перед вставкой (кроме дефолтного значения выберите офис) 
    while(wpSelect.firstChild)
        wpSelect.removeChild(wpSelect.firstChild);
    //формируем option и добавляем в select
    
    const option = document.createElement('option');
    let disOption = option.cloneNode(false);
    disOption.innerHTML='Выберите рабочее место';
    disOption.disabled='1';
    wpSelect.appendChild(disOption);
    for (var i =0;i<curOfficeWorkplacesInfo.length;i++)
    {        
        let curOption = option.cloneNode(false);
        curOption.innerHTML="Рабочее место "+curOfficeWorkplacesInfo[i][1];
        curOption.setAttribute("value",curOfficeWorkplacesInfo[i][0]);
        wpSelect.appendChild(curOption);        
    }
    wpSelect.addEventListener('onchange',showTimeForCurWP(wpSelect.value, userID, isPermanently));    
    $('#wp_add_new_booking').on('change',function(){
        showTimeForCurWP(wpSelect.value, userID, isPermanently);
    });
}

function showTimeForCurWP(wpId, userID, isPermanently)
{
    //все даты на которые есть брони для этого компа
    var allBookingForWP;
    var newData = new FormData();
    newData.append("id", wpId);
    newData.append("curUserId", userID);
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
        url: '/../../php/staff_list/get_all_booking_for_current_userFORADDNEW.php',
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
    if (isPermanently)
    {
        //можно выбрать стартовую дату, где впереди нет ни одной брони
        //ищем самую большую to в disabeledDates
        var max="1000-01-01";
        disabeledDates.forEach(curElement => {
            if (curElement.to>max)
                max=curElement.to;
        });        
        //добавляем в конец промежуток с 1000-01-01 до это самой большой даты
        disabeledDates.push({from: '1000-01-01', to: max});
    }
    //для старта даты
    $("#start_date_add").datepicker("destroy");
    $('#start_date_add').datepicker({
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
            $('#end_date_add').datepicker('option', 'minDate', dateText);
            $('#end_date_add').datepicker('option', 'maxDate', textMaxDate);        
        }
    });
    //для конца даты
    //все даты позже сегодняяшнего дня + 1 год
    //все даты на которые есть брони для этого компа
    //все даты на которые есть брони для этого человека
    $("#end_date_add").datepicker("destroy");
    $('#end_date_add').datepicker({
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
            $('#start_date_add').datepicker('option', 'minDate', textMinDate);
            $('#start_date_add').datepicker('option', 'maxDate', dateText);
        }
    });
}

function addNewBookingForCurUser(userID)
{    
    //собираем все значения
    var curUserId = userID;
    var curWpId=document.getElementById('wp_add_new_booking').value; 
    var isPermanently = document.getElementById('is_permanently_add_new_booking').checked;   
    var startTime = $( "#start_date_add" ).datepicker( "getDate" );
    var endTime;
    if (isPermanently)
        endTime="3000-01-01";
    else
        endTime = $( "#end_date_add" ).datepicker( "getDate" );
    //выводим ошибки
    if (!curWpId || !isPermanently || !startTime || !endTime)
    {
        alert("Заполните все поля!");
        return;
    }
    var startTimeText = startTime.getFullYear()+'-'+(startTime.getMonth()+1)+'-'+startTime.getDate();
    var endTimeText;
    if (!isPermanently)
        endTimeText = endTime.getFullYear()+'-'+(endTime.getMonth()+1)+'-'+endTime.getDate();
    else
        endTimeText='3000-01-01';

    //добавляем в бд новую запись!!!!
    var newData = new FormData();
    newData.append("staff_id", curUserId); 
    newData.append("wp_id", curWpId); 
    newData.append("start_time", startTimeText); 
    newData.append("end_time", endTimeText); 
    if (isPermanently)
        newData.append("IsPermanently", '1'); 
    else        
        newData.append("IsPermanently", '0'); 
    $.ajax({
        type: "POST",
        url: '/../../php/staff_list/add_new_booking_for_curr_user.php',
        data: newData,        
        async: false,
        cache: false,
        processData: false,
        success: function (result) { 
            info=JSON.parse(result);    
            alert(info); 
            popupClose(document.getElementById('popupchoosenUserAddNewBooking'));
            openBookingHistory(userID, false);
        },
        error: function (result) { alert(JSON.parse(result));
        },
        contentType: false,
    });    
    
}