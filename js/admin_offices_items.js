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
        editA.href='#popupInfoEdit';
        let editForm = form.cloneNode(false);
        //задаём свой-ва editForm
        editForm.classList.add('popup-link');
        editForm.action='#popupInfoEdit';
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

// function deleteItem(id)
// {
//     //спрашиваем уверены ли в удалении
//     if (confirm("Удалить?"))
//     {        
//         var currentID;
//         $.ajax({
//             url:'/../php/office_list/get_currentID.php',
//             async: false,
//             success: function(data) {
//                 currentID = JSON.parse(data);
//             }
//         });    
//         //удаляем DELETE PHP        
//         $.ajax({
//             type: "POST",
//             url: '/../php/office_list/delete_employee.php',
//             data: {'id':id},
//             success: function (result) {
//                 //релоад таблицу  
//                 alert("Удалено!");
//                 if (currentID==id) 
//                     location.reload();
//                 else
//                     getItems();
//             },
//             error: function (result) {
//                 alert(result);
//             },
//             contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
//           });
              
//     }
// }
// function displayEditForm(id)
// {
//     //получить все згначения Placeholdera для текущего IDc
//     var curInfo;     
//     $.ajax({
//         type: "POST",
//         url: '/../php/office_list/get_currentInfoViaID.php',
//         data: {'id':id},
//         success: function (result) {            
//             curInfo = JSON.parse(result);
//             var curId=curInfo[0];
//             var curLogin=curInfo[1];
//             var curPassword=curInfo[2];
//             var curImage=curInfo[3];
//             var curRole=curInfo[4];
//             var curFirst_name=curInfo[5];
//             var curLast_name=curInfo[6];
//             var curPatronymic=curInfo[7];
//             var curPhone_number=curInfo[8];
//             var curEmail=curInfo[9];
//             var curDepartment=curInfo[10];
//             //подогнать значения placeholdera под текущий ID
//             document.getElementById('current_id_for_edit').setAttribute('name', curId);
//             document.getElementById('avatar_edit_note').src=curImage;
//             document.getElementById('role_edit').value=curRole;
//             document.getElementById('login_edit').placeholder=curLogin;
//             document.getElementById('first_name_edit').placeholder=curFirst_name;
//             document.getElementById('last_name_edit').placeholder=curLast_name;
//             document.getElementById('patronymic_edit').placeholder=curPatronymic;
//             document.getElementById('phone_number_edit').placeholder=curPhone_number;
//             document.getElementById('email_address_edit').placeholder=curEmail;
//             document.getElementById('department_edit').placeholder=curDepartment;
//         },
//         error: function (result) {
//             alert('error');
//         },
//         contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
//         });
    
// }