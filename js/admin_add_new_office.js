document.getElementById('btn_add_new_office').setAttribute('onclick','addInfo()');

document.getElementById('btn_add_new_office').addEventListener('click', function () {
    event.preventDefault(); // Убираем событие отправки формы (убираем перезагрузку страницы) 
});
function addInfo()
{    
    // собрать всю инфу с формы
    var floor = document.getElementById('floor').value;
    var number = document.getElementById('number').value;
    
    if (floor=='' ||number=='')
    {
        alert("Все поля обязательны к заполнению!");
        return;
    }
    // отправить в php на обработку
    var newData = new FormData();
    newData.append("floor", floor);    
    newData.append("number", number);
    $.ajax({
        type: "POST",
        url: '/../php/admin_edit_mode/admin_add_new_office.php',
        data: newData,        
        async: false,
        cache: false,
        processData: false,
        success: function (result) { 
            let info=JSON.parse(result);
            alert(info);
            if (info=='Добавлено!') 
                //обновляем страницу
                location.reload();
        },
        error: function (result) { alert(JSON.parse(result));
        },
        contentType: false,
    });      
}