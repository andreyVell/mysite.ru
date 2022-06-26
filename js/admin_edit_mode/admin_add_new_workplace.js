document.getElementById('btn_add_new_workplace').setAttribute('onclick','addWorkplaceInfo()');

document.getElementById('btn_add_new_workplace').addEventListener('click', function () {
    event.preventDefault(); // Убираем событие отправки формы (убираем перезагрузку страницы) 
});
function addWorkplaceInfo()
{    
    // собрать всю инфу с формы
    var officeId = document.getElementById('location').value;
    var specifications = document.getElementById('specifications').value;
    var number = document.getElementById('wp_number').value;    
    if (officeId=='' ||number==''||specifications=='')
    {
        alert("Все поля обязательны к заполнению!");
        return;
    }
    // отправить в php на обработку
    var newData = new FormData();
    newData.append("office_id", officeId);  
    newData.append("specifications", specifications);    
    newData.append("number", number);
    $.ajax({
        type: "POST",
        url: '/../../php/admin_edit_mode/admin_add_new_workplace.php',
        data: newData,        
        async: false,
        cache: false,
        processData: false,
        success: function (result) { 
            let info=JSON.parse(result);
            alert(info);
            if (info=='Добавлено!') 
                //обновляем страницу
                getWorkplaceItems();
                //location.reload();
                displayEditMap(officeId);
                popupOpen(document.getElementById('popupWpMapEdit'));
        },
        error: function (result) { alert(JSON.parse(result));
        },
        contentType: false,
    });      
}