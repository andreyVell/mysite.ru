document.getElementById('save_edited_info').setAttribute('onclick','saveInfo()');
document.getElementById('save_edited_info').addEventListener('click', function () {
    event.preventDefault(); // Убираем событие отправки формы  
});
function saveInfo()
{    
    // собрать всю инфу с формы    
    var login = document.getElementById('login').value;
    var password_old = document.getElementById('old_password').value;
    var password_new = document.getElementById('new_password').value;
    var first_name = document.getElementById('first_name').value;
    var last_name = document.getElementById('last_name').value;
    var patronymic = document.getElementById('patronymic').value;
    var phone_number = document.getElementById('phone_number').value;
    var email = document.getElementById('email_address').value;

    // отправить в php на обработку
    var newAvatarData = new FormData();
    if (document.getElementById("new_avatar").files.length>0) 
        newAvatarData.append("new_avatar", document.getElementById("new_avatar").files[0],document.getElementById("new_avatar").files[0].name); 
       
    newAvatarData.append("first_name", first_name); 
    newAvatarData.append("last_name", last_name); 
    newAvatarData.append("patronymic", patronymic); 
    newAvatarData.append("login", login); 
    newAvatarData.append("old_password", password_old); 
    newAvatarData.append("new_password", password_new); 
    newAvatarData.append("email_address", email); 
    newAvatarData.append("phone_number", phone_number); 
    $.ajax({
        type: "POST",
        url: '/../php/account/edit_info.php',
        data: newAvatarData,        
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