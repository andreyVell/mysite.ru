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
        let cellindex = -2;
        if (curr_role ==1 )
        {
            let td0 = tr.insertCell(0);
            td0.appendChild(editA);
            td0.classList.add('edit-btn');

            let td1 = tr.insertCell(1);
            td1.appendChild(deleteButton);        
            td1.classList.add('delete-btn');
            cellindex=0;
        }

        let td2 = tr.insertCell(2 + cellindex);
        td2.appendChild(idNode);

        let td3 = tr.insertCell(3 + cellindex);
        td3.appendChild(last_nameNode);

        let td4 = tr.insertCell(4 + cellindex);
        td4.appendChild(first_nameNode);

        let td5 = tr.insertCell(5 + cellindex);
        td5.appendChild(patronymicNode);

        let td6 = tr.insertCell(6 + cellindex);
        td6.appendChild(departmentNode);

        let td7 = tr.insertCell(7 + cellindex);
        td7.appendChild(workplaceNode);

        let td8 = tr.insertCell(8 + cellindex);
        td8.appendChild(phone_numberNode);

        let td9 = tr.insertCell(9 + cellindex);
        td9.appendChild(emailNode);
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