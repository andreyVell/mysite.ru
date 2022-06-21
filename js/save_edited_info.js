document.getElementById('save_edited_info').setAttribute('onclick','saveInfo()');
document.getElementById('save_edited_info').addEventListener('click', function () {
    event.preventDefault(); // Убираем событие отправки формы  
});

function saveInfo()
{           
    // получить id 
    var cur_edit_id = document.getElementById('current_id_for_edit').getAttribute('name');
    // собрать всю инфу с формы
    var role = document.getElementById('role_edit').value;
    var login = document.getElementById('login_edit').value;
    var password = document.getElementById('password_edit').value;
    var first_name = document.getElementById('first_name_edit').value;
    var last_name = document.getElementById('last_name_edit').value;
    var patronymic = document.getElementById('patronymic_edit').value;
    var phone_number = document.getElementById('phone_number_edit').value;
    var email = document.getElementById('email_address_edit').value;
    var department = document.getElementById('department_edit').value;
    
    // отправить в php на обработку
    // сначала автарку
    if (document.getElementById("edit_avatar").files.length>0)    
    {
        var newAvatarData = new FormData();
        newAvatarData.append("edit_avatar", document.getElementById("edit_avatar").files[0],document.getElementById("edit_avatar").files[0].name);     
        $.ajax({
            type: "POST",
            url: '/../php/staff_list/edit_avatar_employee.php',
            data: newAvatarData,
            async: false,
            cache: false,
            processData: false,
            success: function (result) {
        },
        error: function (result) {
        },
        contentType: false,
        });
    }
    //все остальное
    $.ajax({
        type: "POST",
        url: '/../php/staff_list/edit_employee.php',
        data: {
            'id':cur_edit_id,
            'role':role,
            'first_name':first_name,
            'last_name':last_name,
            'patronymic':patronymic,
            'login':login,
            'password':password,
            'email':email,
            'phone_number':phone_number,
            'department':department,
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