document.getElementById('button_add_workplace').setAttribute('onclick','displayAddWorkplaceForm("location")');

document.getElementById('button_add_workplace').addEventListener('click', function () {
    event.preventDefault(); // Убираем событие отправки формы (убираем перезагрузку страницы) 
});

function displayAddWorkplaceForm(elementId)
{    
    //вставить нужные option в select
    let locationSelect = document.getElementById(elementId);
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
    // if (locationSelect.childNodes.length>1)
    //     for (let index =locationSelect.childNodes.length; index>1;index--)
    //             {                    
    //                 if (locationSelect.childNodes[index])
    //                     locationSelect.removeChild(locationSelect.childNodes[index]);
    //             }
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
}