const tBody = document.querySelector('.wrap_part');
    

function mapGetOfficeItems()
{    
    var office_list;
    $.ajax({
        url:'/../../php/admin_edit_mode/admin_get_office_table.php',
        async: false,
        success: function(data) {
            office_list = JSON.parse(data);
        }
    }); 
    //очищаем область перед созданием
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }
    const div = document.createElement('div');
    for (var i =0;i<office_list.length;i++)
    {
        let officeDiv = div.cloneNode(false);
        officeDiv.classList.add('office_object');
        officeDiv.innerHTML='Этаж '+office_list[i][1]+", офис "+office_list[i][2];
        officeDiv.setAttribute('onclick','displayBooking(' + office_list[i][[0]] + ')');


        tBody.appendChild(officeDiv);
    }
}

function displayBooking(id)
{
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }
    //удаляем кнопку редактирования
    if (document.getElementById('admin_edit_button'))
        document.querySelector(".main_part").removeChild(document.getElementById('admin_edit_button'));
    //сразу добавляем div в tBody
    let divMain=document.createElement('div');
    divMain.classList.add('scroll');
    divMain.id="wrap_map_area";
    tBody.appendChild(divMain);
    //сначала получаем всю инфу об офисе через id 
    var newOfficeData = new FormData();
    newOfficeData.append("id", id); 
    var curOfficeInfo;    
    $.ajax({
        type: "POST",
        url: '/../../php/admin_edit_mode/admin_get_offices_placeholderInfo.php',
        data: newOfficeData,        
        async: false,
        cache: false,
        processData: false,
        success: function (result) { 
            curOfficeInfo=JSON.parse(result);
        },
        error: function (result) { alert(JSON.parse(result));
        },
        contentType: false,
    });    
    var curId =curOfficeInfo[0];
    var curFloor=curOfficeInfo[1];
    var curNumber=curOfficeInfo[2];         
    var curImage = curOfficeInfo[3]; 
    //добавляем строку навигации
    let a = document.createElement('a');
    a.href="map.php";
    a.innerHTML='Карта > Этаж '+curFloor+"-офис "+curNumber;
    a.classList.add("nav_bar");
    document.querySelector(".main_part").insertBefore(a,document.querySelector(".main_part").firstChild);

    
    //рисуем карту на бг
    let img = document.createElement('img');
    img.src=curImage;
    img.classList.add('scheme_img');
    img.zoom="100%";    
    divMain.appendChild(img);
    divMain.style.marginTop='0px';
    //zoom in/out
    let zoomInIcon = document.createElement('i');
    zoomInIcon.classList.add('fa-solid');
    zoomInIcon.classList.add('fa-magnifying-glass-plus');
    let zoomInButtom = document.createElement('button');
    zoomInButtom.classList.add('zoomInButton');
    zoomInButtom.appendChild(zoomInIcon);
    zoomInButtom.setAttribute('onclick','zoomIn()');
    document.querySelector(".main_part").appendChild(zoomInButtom);

    let zoomOutIcon = document.createElement('i');
    zoomOutIcon.classList.add('fa-solid');
    zoomOutIcon.classList.add('fa-magnifying-glass-minus');
    let zoomOutButtom = document.createElement('button');
    zoomOutButtom.classList.add('zoomOutButton');
    zoomOutButtom.appendChild(zoomOutIcon);
    zoomOutButtom.setAttribute('onclick','zoomOut()');
    document.querySelector(".main_part").appendChild(zoomOutButtom);
    
    
    //получаем всю инфу об рабочих местах в этом офисе
    var newCurWorkplacesData = new FormData();
    newCurWorkplacesData.append("id", curId); 
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
    
    //рисуем столы curOfficeWorkplacesInfo
    curOfficeWorkplacesInfo.forEach(element => {
        let workplace_object=document.createElement('div');
        workplace_object.classList.add('workplace_object');
        if (element[8]==1)
                workplace_object.classList.add('permanently');
            else
            if (element[4]==1)
                workplace_object.classList.add('notfree');
            else            
                workplace_object.classList.add('free');
        workplace_object.innerHTML=element[1];
        workplace_object.style.top=element[6];
        workplace_object.style.left=element[7];
        workplace_object.setAttribute('onclick','displayBookingPopup('+element[0]+')');
        workplace_object.classList.add('popup-link');

        let aWPPopup = document.createElement('a');
        aWPPopup.classList.add('popup-link');
        aWPPopup.href = '#popupWorkplaceBookInfo';
        aWPPopup.appendChild(workplace_object);
        
        divMain.appendChild(aWPPopup);
    });  
    //для удобства изначальный зум
    document.getElementById("wrap_map_area").style.zoom="50%"; 
    //чтобы popup работал
    makePopupWorks();

}
const zoomDelta=5;
function zoomIn()
{
    let curArea = document.getElementById("wrap_map_area");    
    let curZoom = Number(curArea.style.zoom.slice(0, -1));
    if (curZoom==0)
        curZoom=100;
    let newZoom = curZoom+zoomDelta;
    curArea.style.zoom=newZoom+"%";
}
function zoomOut()
{
    let curArea = document.getElementById("wrap_map_area"); 
    let curZoom = Number(curArea.style.zoom.slice(0, -1));
    if (curZoom==0)
        curZoom=100;
    if (curZoom-zoomDelta>0)
        {
            let newZoom = curZoom-zoomDelta;
            curArea.style.zoom=newZoom+"%";
        }
    
}
function displayBookingPopup(id)
{    
    //устанавливаем id для сохранения 
    document.getElementById('current_workplace_id_for_booking').name=id;    
    //получаем информацию для конкретного стола и подгоняем инфу с попапа под конретный стол
    //местоположение и спецификация
    $.ajax({
        type: "POST",
        url: '/../../php/map/get_wp_location_and_spec.php',
        data: {'id':id},
        success: function (result) {            
            var curInfo = JSON.parse(result); 
            document.querySelector('.workplace_location_info').innerHTML="Этаж "+curInfo[0]+", офис "+curInfo[1]+", рабочее место "+curInfo[2];            
            document.querySelector('.workplace_specification_info').innerHTML='<span class="computer">Компьютер: </span>'+curInfo[3];
        },
        error: function (result) {
            alert('error');
        },
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
        });
    //Текущий пользователь
    $.ajax({
        type: "POST",
        url: '/../../php/map/get_wp_curUser.php',
        data: {'id':id},
        success: function (result) {            
            var curInfo = JSON.parse(result); 
            if (curInfo!= null)
                document.querySelector('.workplace_curr_user_info').innerHTML='<span>Располагается: </span>'+curInfo[1]+' '+curInfo[0]+' '+curInfo[2];
            else
                document.querySelector('.workplace_curr_user_info').innerHTML='';
        },
        error: function (result) {
            alert('error');
        },
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
        });
    //История бронирования
    const tBody = document.getElementById('booking_list');
    //очищаем таблицу перед созданием
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }
    $.ajax({
        type: "POST",
        url: '/../../php/map/get_wp_bookingHistory.php',
        data: {'id':id},
        success: function (result) {            
            var curInfo = JSON.parse(result);  
            //если история бронирования пустая          
            if  (curInfo.length==0)
            {
                let emptyNode = document.createTextNode('Пусто');
                let tr = tBody.insertRow();  
                tr.classList.add('table_cell');
                tr.style.fontStyle='italic';
                let td10 = tr.insertCell(0);
                td10.appendChild(emptyNode.cloneNode(false));
                let td11 = tr.insertCell(1);
                td11.appendChild(emptyNode.cloneNode(false));
                let td12 = tr.insertCell(2);
                td12.appendChild(emptyNode.cloneNode(false));
            }
            for (var i =0;i<curInfo.length;i++)
            {
                let nameNode = document.createTextNode(curInfo[i][1]+' '+curInfo[i][0]+' '+curInfo[i][2]);
                var startDateNode;
                if (curInfo[i][3][0]!='3')
                    startDateNode = document.createTextNode(curInfo[i][3]);
                else
                    startDateNode = document.createTextNode("Перманентно");
                var endDateNode;
                if (curInfo[i][4][0]!='3')
                    endDateNode = document.createTextNode(curInfo[i][4]);
                else
                    endDateNode = document.createTextNode("Перманентно");
                let tr = tBody.insertRow();                
                tr.classList.add('table_cell');
                //если дата текущая то 
                var curDate=new Date();
                var startDate=new Date(curInfo[i][3]);
                var endDate=new Date(curInfo[i][4]);
                if (startDate<=curDate && curDate<=endDate)
                    tr.classList.add('current');

                let td0 = tr.insertCell(0);
                td0.appendChild(nameNode);

                let td1 = tr.insertCell(1);
                td1.appendChild(startDateNode);

                let td2 = tr.insertCell(2);
                td2.appendChild(endDateNode);
            }
        },
        error: function (result) {
            alert('error');
        },
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
        });
    var IsCurUserHavePerm;
    //если у пользователя на текущий момент есть перманентная бронь то не отображаем кнопку забронировать
    $.ajax({
        type: "POST",
        url: '/../../php/map/is_cur_user_have_current_perm_booking.php',  
        async: false,      
        success: function (result) {            
            var curWPInfo = JSON.parse(result);    
            IsCurUserHavePerm= curWPInfo[0];    
        },
        error: function (result) {
            alert('error');
        },
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
        });
    //if данный комп IsPermanently то не отображаем кнопку забронировать
    $.ajax({
        type: "POST",
        url: '/../../php/admin_edit_mode/admin_get_workplaces_placeholderInfo.php',
        async: false, 
        data: {'id':id},
        success: function (result) {            
            var curWPInfo = JSON.parse(result); 
            if (curWPInfo[8]==1 || IsCurUserHavePerm==1)
            {                        
                document.getElementById('btn_to_book_wp').style.display = 'none';
                document.querySelector('.popup_content').style.paddingBottom="0px";
            }
            else
            {                   
                document.getElementById('btn_to_book_wp').style.display = 'inline';
                document.querySelector('.popup_content').style.paddingBottom="35px";
            }
        },
        error: function (result) {
            alert('error');
        },
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
        });
    
    var curUser = document.querySelector('.workplace_curr_user_info');     
}

function makePopupWorks()
{
    const popupLinks = document.querySelectorAll(".popup-link");
    const body = document.querySelector('body');
    const lockPadding = document.querySelectorAll(".lock-padding");

    let unlock = true;

    const timeout =300;

    if (popupLinks.length > 0)
    {        
        for (let index = 0; index<popupLinks.length;index++)
        {
            const popupLink = popupLinks[index];
            popupLink.addEventListener("click",function(e)
            {            
                
                const popupName =  popupLink.getAttribute('href').replace('#','');
                const curentPopup = document.getElementById(popupName);
                popupOpen(curentPopup);
                e.preventDefault();
            });
        }
    }

    const popupCloseIcon = document.querySelectorAll('.close-popup');
    if (popupCloseIcon.length > 0)
    {
        for (let index = 0; index<popupCloseIcon.length;index++)
        {
            const el = popupCloseIcon[index];
            el.addEventListener('click',function(e) {
                popupCloseIcon(el.closest('.popup'));
                e.preventDefault();
            });
        }
    }

    function popupOpen(currentPopup)
    {        
        if (currentPopup && unlock)
        {        
            const popupActive = document.querySelector(".popup.open");
            if (popupActive)
            {                
                popupClose(popupActive);
            }        
            
            currentPopup.classList.add('open');
            currentPopup.addEventListener("click",function(e){
                if (!e.target.closest('.popup_content'))
                {
                    popupClose(e.target.closest('.popup'));
                }
            });
        }
    }
    function popupClose(popupActive)
    {        
        if (unlock)
        {
            popupActive.classList.remove('open');
        }
    }

    document.addEventListener('keydown', function (e){
        if (e.which === 27) {
            const popupActive = document.querySelector('.popup.open');
            popupClose(popupActive);
        }
    });
}
