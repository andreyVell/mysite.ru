function getItems()
{
    var office_list;
    $.ajax({
        url:'/../php/admin_edit_mode/admin_get_office_table.php',
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
        td2.appendChild(idNode);

        let td3 = tr.insertCell(3);
        td3.appendChild(floorNode);

        let td4 = tr.insertCell(4);
        td4.appendChild(numberNode);
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
            url: '/../php/admin_edit_mode/admin_delete_office.php',
            data: {'id':id},
            success: function (result) {
                //релоад таблицу  
                alert(JSON.parse(result));                
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
        url: '/../php/admin_edit_mode/admin_get_placeholderInfo.php',
        data: {'id':id},
        success: function (result) {            
            curInfo = JSON.parse(result);
            var curId =curInfo[0];
            var curFloor=curInfo[1];
            var curNumber=curInfo[2];            
            //подогнать значения placeholdera под текущий ID7
            document.getElementById('current_office_id_for_edit').setAttribute('name', curId);
            document.getElementById('floor_edit').placeholder=curFloor;
            document.getElementById('number_edit').placeholder=curNumber;
        },
        error: function (result) {
            alert('Error!');
        },
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
        });
    
}