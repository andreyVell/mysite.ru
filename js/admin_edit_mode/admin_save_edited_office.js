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
    var newOfficeData = new FormData();
    if (document.getElementById("edit_one_scheme").files.length>0) 
        newOfficeData.append("edit_one_scheme", document.getElementById("edit_one_scheme").files[0],document.getElementById("edit_one_scheme").files[0].name); 
       
    newOfficeData.append("id", cur_edit_id); 
    newOfficeData.append("floor", floor); 
    newOfficeData.append("number", number); 


    $.ajax({
        type: "POST",
        url: '/../../php/admin_edit_mode/admin_save_edited_office.php',
        data: newOfficeData,        
        async: false,
        cache: false,
        processData: false,
        success: function (result) { 
            let info=JSON.parse(result);
            alert(info);
            if (info=='Сохранено!') 
                //обновляем страницу
                location.reload();
        },
        error: function (result) { alert(JSON.parse(result));
        },
        contentType: false,
    });    
}