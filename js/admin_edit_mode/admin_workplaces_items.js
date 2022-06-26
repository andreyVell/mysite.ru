function getWorkplaceItems()
{
    var workplaces_list;
    $.ajax({
        url:'/../../php/admin_edit_mode/admin_get_workplace_table.php',
        async: false,
        success: function(data) {
            workplaces_list = JSON.parse(data);
        }
    });     
    const tBody = document.getElementById('workplaces_list');
    //очищаем таблицу перед созданием
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }
    const button = document.createElement('button');
    const icon = document.createElement('i');
    const a = document.createElement('a');
    const form = document.createElement('form');
    for (var i =0;i<workplaces_list.length;i++)
    {
        let editButton = button.cloneNode(false);
        let editIcon = icon.cloneNode(false);
        editIcon.classList.add('fa-regular');
        editIcon.classList.add('fa-pen-to-square');
        editButton.setAttribute('onclick','displayEditFormWorkplace(' + workplaces_list[i][0] + ')');
        editButton.appendChild(editIcon); 
        
        let deleteButton = button.cloneNode(false);
        let deleteIcon = icon.cloneNode(false);
        deleteIcon.classList.add('fa-regular');
        deleteIcon.classList.add('fa-trash-can');
        deleteButton.setAttribute('onclick','deleteItemWorkplace(' + workplaces_list[i][0] + ')');
        deleteButton.appendChild(deleteIcon);         

        let idNode = document.createTextNode(workplaces_list[i][0]);
        let floorNode = document.createTextNode(workplaces_list[i][1]);
        let office_numberNode = document.createTextNode(workplaces_list[i][2]);
        let numberNode = document.createTextNode(workplaces_list[i][3]);
        let specificationsNode = document.createTextNode(workplaces_list[i][4]);
        let isBusyNode = document.createTextNode(workplaces_list[i][5]);

        let locationNode = document.createTextNode("Этаж "+workplaces_list[i][1]+", офис "+workplaces_list[i][2]);

        let tr = tBody.insertRow();
        tr.classList.add('table_cell');        
        
        let td0 = tr.insertCell(0);
        td0.appendChild(editButton);
        td0.classList.add('edit-btn');
        td0.classList.add('btn-column');
        
        let td1 = tr.insertCell(1);
        td1.appendChild(deleteButton);        
        td1.classList.add('delete-btn');   
        td1.classList.add('btn-column'); 

        

        let td2 = tr.insertCell(2);
        td2.appendChild(idNode);

        let td3 = tr.insertCell(3);
        td3.appendChild(locationNode);

        let td4 = tr.insertCell(4);
        td4.appendChild(specificationsNode);

        let td5 = tr.insertCell(5);
        td5.appendChild(numberNode);
    }
}

function deleteItemWorkplace(id)
{
    //спрашиваем уверены ли в удалении
    if (confirm("Удалить?"))
    {             
        //удаляем DELETE PHP        
        $.ajax({
            type: "POST",
            url: '/../php/admin_edit_mode/admin_delete_workplace.php',
            data: {'id':id},
            success: function (result) {
                //релоад таблицу  
                alert(JSON.parse(result));                
                getWorkplaceItems();
            },
            error: function (result) {
                alert(result);
            },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
          });
              
    }
}
function displayEditFormWorkplace(id)
{
    //получить все згначения Placeholdera для текущего IDc
    var curInfo;        
    displayAddWorkplaceForm("location_edit");
    $.ajax({
        type: "POST",
        url: '/../php/admin_edit_mode/admin_get_workplaces_placeholderInfo.php',
        data: {'id':id},
        success: function (result) {   
            curInfo = JSON.parse(result);
            var curId =curInfo[0];
            var officeId = curInfo[5];
            var specification = curInfo[2];
            var number = curInfo[1];
            //подогнать значения placeholdera под текущий ID
            document.getElementById('current_workplace_id_for_edit').setAttribute('name', curId);
            document.getElementById("location_edit").value=officeId;
            document.getElementById('specifications_edit').placeholder=specification;
            document.getElementById('wp_number_edit').placeholder=number;
            popupOpen(document.getElementById('popupWorkPlaceEdit'));
        },
        error: function (result) {
            alert('Error!');
        },
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
        });
    popupOpen(document.getElementById('popupWorkPlaceEdit'));
}