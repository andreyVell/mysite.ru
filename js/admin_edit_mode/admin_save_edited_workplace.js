document.getElementById('btn_edit_workplace').setAttribute('onclick','saveWorkplaceInfo()');
document.getElementById('btn_edit_workplace').addEventListener('click', function () {
    event.preventDefault(); // Убираем событие отправки формы  
});

function saveWorkplaceInfo()
{               
    // получить id 
    var cur_edit_id = document.getElementById('current_workplace_id_for_edit').getAttribute('name');
    // собрать всю инфу с формы
    var officeId = document.getElementById('location_edit').value;
    var specifications = document.getElementById('specifications_edit').value;
    var number = document.getElementById('wp_number_edit').value;    
    // отправить в php на обработку    
    $.ajax({
        type: "POST",
        url: '/../../php/admin_edit_mode/admin_save_edited_workplace.php',
        data: {
            'id':cur_edit_id,
            'office':officeId,
            'specifications':specifications,
            'number':number,
        },        
        success: function (result) { 
            let info =JSON.parse(result);
            alert(info);
            if (info=="Сохранено!")                
                {
                    //обновляем страницу
                    location.reload();
                    getWorkplaceItems();
                }

        },
        error: function (result) { alert(JSON.parse(result));
        },
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    });    
}