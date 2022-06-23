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
    //очищаем таблицу перед созданием
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
    //сначала получаем всю инфу об офисе
    //получаем всю инфу об рабочих местах в этом офисе
    let a = document.createElement('a');
    a.href="map.php";
    a.innerHTML='Карта/';
    tBody.appendChild(a);
}