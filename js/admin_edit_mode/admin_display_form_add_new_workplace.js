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
    for (let index =locationSelect.childNodes.length; index>1;index++)
            locationSelect.removeChild(locationSelect.childNodes[index]);
    //формируем option и добавляем в select
    const option = document.createElement('option');  
    for (var i =0;i<office_list.length;i++)
    {        
        let curOption = option.cloneNode(false);
        curOption.innerHTML="Этаж "+office_list[i][1]+", офис "+office_list[i][2];
        curOption.setAttribute("value",office_list[i][0]);
        locationSelect.appendChild(curOption);
    }
}