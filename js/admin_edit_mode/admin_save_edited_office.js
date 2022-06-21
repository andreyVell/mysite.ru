document.getElementById('btn_edit_office').setAttribute('onclick','saveOfficeInfo()');
document.getElementById('btn_edit_office').addEventListener('click', function () {
    event.preventDefault(); // Убираем событие отправки формы  
});

function saveOfficeInfo()
{               
    // получить id 
    var cur_edit_id = document.getElementById('current_office_id_for_edit').getAttribute('name');
    // собрать всю инфу с формы
    var floor = document.getElementById('floor_edit').value;
    var number = document.getElementById('number_edit').value;    
    // отправить в php на обработку    
    $.ajax({
        type: "POST",
        url: '/../../php/admin_edit_mode/admin_save_edited_office.php',
        data: {
            'id':cur_edit_id,
            'floor':floor,
            'number':number,
        },        
        success: function (result) { 
            let info =JSON.parse(result);
            alert(info);
            if (info=="Сохранено!")
                //обновляем страницу
                location.reload();
        },
        error: function (result) { alert(JSON.parse(result));
        },
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    });    
}