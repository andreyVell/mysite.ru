document.getElementById('save_add_info').setAttribute('onclick','addInfo()');

document.getElementById('save_add_info').addEventListener('click', function () {
    event.preventDefault(); // Убираем событие отправки формы  
});
function addInfo()
{    
    // собрать всю инфу с формы
    var role = document.getElementById('role').value;
    var login = document.getElementById('login').value;
    var password = document.getElementById('password').value;
    var first_name = document.getElementById('first_name').value;
    var last_name = document.getElementById('last_name').value;
    var patronymic = document.getElementById('patronymic').value;
    var phone_number = document.getElementById('phone_number').value;
    var email = document.getElementById('email_address').value;
    var department = document.getElementById('department').value;
    if (role=='' ||login=='' ||password=='' ||first_name=='' ||last_name=='' ||patronymic=='' ||phone_number=='' ||email==''||department=='')
    {
        alert("Все поля обязательны к заполнению!");
        return;
    }
    // отправить в php на обработку
    var newAvatarData = new FormData();
    if (document.getElementById("new_avatar").files.length>0)  
        newAvatarData.append("new_avatar", document.getElementById("new_avatar").files[0],document.getElementById("new_avatar").files[0].name); 
    newAvatarData.append("role", role);    
    newAvatarData.append("first_name", first_name); 
    newAvatarData.append("last_name", last_name); 
    newAvatarData.append("patronymic", patronymic); 
    newAvatarData.append("login", login); 
    newAvatarData.append("password", password); 
    newAvatarData.append("email_address", email); 
    newAvatarData.append("phone_number", phone_number); 
    newAvatarData.append("department", department);
    $.ajax({
        type: "POST",
        url: '/../../php/staff_list/add_new_employee.php',
        data: newAvatarData,        
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