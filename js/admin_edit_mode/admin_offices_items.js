function getOfficeItems()
{
    var office_list;
    $.ajax({
        url:'/../../php/admin_edit_mode/admin_get_office_table.php',
        async: false,
        success: function(data) {
            office_list = JSON.parse(data);
        }
    }); 
    const tBody = document.getElementById('office_list');
    //очищаем таблицу перед созданием
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }
    const button = document.createElement('button');
    const icon = document.createElement('i');
    const a = document.createElement('a');
    const form = document.createElement('form');   
    for (var i =0;i<office_list.length;i++)
    {
        let editButton = button.cloneNode(false);
        let editIcon = icon.cloneNode(false);
        editIcon.classList.add('fa-regular');
        editIcon.classList.add('fa-pen-to-square');
        editButton.setAttribute('onclick','displayEditForm(' + office_list[i][[0]] + ')');
        editButton.appendChild(editIcon); 
        
        let deleteButton = button.cloneNode(false);
        let deleteIcon = icon.cloneNode(false);
        deleteIcon.classList.add('fa-regular');
        deleteIcon.classList.add('fa-trash-can');
        deleteButton.setAttribute('onclick','deleteItem(' + office_list[i][[0]] + ')');
        deleteButton.appendChild(deleteIcon);

        let editMapButton = button.cloneNode(false);
        let editMapIcon = icon.cloneNode(false);
        editMapIcon.classList.add('fa-solid');
        editMapIcon.classList.add('fa-map-location-dot');
        editMapButton.setAttribute('onclick','displayEditMap(' + office_list[i][[0]] + ')');
        editMapButton.appendChild(editMapIcon);
        let editMapA=a.cloneNode(false);
        editMapA.classList.add('popup-link');
        editMapA.href='#popupWpMapEdit';
        editMapA.appendChild(editMapButton);
        
        let editA = a.cloneNode(false);
        //задаём свой-ва editA
        editA.classList.add('popup-link');
        editA.href='#popupOfficeEdit';  //<-- ГЛАВНЕЕ ДЛЯ ОТКРЫТИЯ ПОПАПА
        let editForm = form.cloneNode(false);
        //задаём свой-ва editForm
        editForm.classList.add('popup-link');
        editForm.action='#popupOfficeEdit';
        //задаём сво-ства editButton
        editButton.classList.add('popup-link');
        editForm.appendChild(editButton);
        editA.appendChild(editForm);

        let idNode = document.createTextNode(office_list[i][0]);
        let floorNode = document.createTextNode(office_list[i][1]);
        let numberNode = document.createTextNode(office_list[i][2]);
        let tr = tBody.insertRow();
        tr.classList.add('table_cell');        
        
        let td0 = tr.insertCell(0);
        td0.appendChild(editA);
        td0.classList.add('edit-btn');
        td0.classList.add('btn-column');
        
        let td1 = tr.insertCell(1);
        td1.appendChild(deleteButton);        
        td1.classList.add('delete-btn');   
        td1.classList.add('btn-column'); 

        let td2 = tr.insertCell(2);
        td2.appendChild(editMapA);        
        td2.classList.add('editMap-btn');   
        td2.classList.add('btn-column'); 

        

        let td3 = tr.insertCell(3);
        td3.appendChild(idNode);

        let td4 = tr.insertCell(4);
        td4.appendChild(floorNode);

        let td5 = tr.insertCell(5);
        td5.appendChild(numberNode);
    }
}

function deleteItem(id)
{
    //спрашиваем уверены ли в удалении
    if (confirm("Удалить?"))
    {             
        //удаляем DELETE PHP        
        $.ajax({
            type: "POST",
            url: '/../../php/admin_edit_mode/admin_delete_office.php',
            data: {'id':id},
            success: function (result) {
                //релоад таблицу  
                alert(JSON.parse(result));                
                location.reload();
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
        url: '/../../php/admin_edit_mode/admin_get_offices_placeholderInfo.php',
        data: {'id':id},
        success: function (result) {            
            curInfo = JSON.parse(result);
            var curId =curInfo[0];
            var curFloor=curInfo[1];
            var curNumber=curInfo[2];         
            var curImage = curInfo[3];   
            //подогнать значения placeholdera под текущий ID
            document.getElementById('current_office_id_for_edit').setAttribute('name', curId);
            document.getElementById('floor_edit').placeholder=curFloor;
            document.getElementById('number_edit').placeholder=curNumber;
            document.getElementById('office_scheme_edit_one').src=curImage;
        },
        error: function (result) {
            alert('Error!');
        },
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
        });
    
}

const tBody = document.querySelector('.wrap_part');
function displayEditMap(id)
{
    //alert('id = '+id);
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }    
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

    //рисуем карту на бг
    let img = document.createElement('img');
    img.src=curImage;
    img.classList.add('scheme_img');
    img.zoom="100%"
    divMain.appendChild(img);
    divMain.style.marginTop='0px'
    //zoom in/out
    let zoomInIcon = document.createElement('i');
    zoomInIcon.classList.add('fa-solid');
    zoomInIcon.classList.add('fa-magnifying-glass-plus');
    let zoomInButtom = document.createElement('button');
    zoomInButtom.classList.add('zoomInButton');
    zoomInButtom.appendChild(zoomInIcon);
    zoomInButtom.setAttribute('onclick','zoomIn()');
    zoomInButtom.addEventListener('click', function () {
        event.preventDefault(); // Убираем событие отправки формы (убираем перезагрузку страницы) 
    });
    document.querySelector(".wrap_part").appendChild(zoomInButtom);

    let zoomOutIcon = document.createElement('i');
    zoomOutIcon.classList.add('fa-solid');
    zoomOutIcon.classList.add('fa-magnifying-glass-minus');
    let zoomOutButtom = document.createElement('button');
    zoomOutButtom.classList.add('zoomOutButton');
    zoomOutButtom.appendChild(zoomOutIcon);
    zoomOutButtom.setAttribute('onclick','zoomOut()');
    zoomOutButtom.addEventListener('click', function () {
        event.preventDefault(); // Убираем событие отправки формы (убираем перезагрузку страницы) 
    });
    document.querySelector(".wrap_part").appendChild(zoomOutButtom);
    
    
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