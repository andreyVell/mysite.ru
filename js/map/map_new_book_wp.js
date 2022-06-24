document.getElementById('btn_to_book_wp').setAttribute('onclick','addNewBooking()');

document.getElementById('btn_to_book_wp').addEventListener('click', function () {
    event.preventDefault(); // Убираем событие отправки формы (убираем перезагрузку страницы) 
});
function addNewBooking()
{    
    
    //миллиард различных проверок!!!!!!!! + добавить возможность бессрочного бронирования для некоторых сотрудников
    // получить id 
    var cur_wp_id = document.getElementById('current_workplace_id_for_booking').name;
    alert('id = '+cur_wp_id);

    // собрать всю инфу с формы
    // var floor = document.getElementById('floor').value;
    // var number = document.getElementById('number').value;
    
    // if (floor=='' ||number=='')
    // {
    //     alert("Все поля обязательны к заполнению!");
    //     return;
    // }
    // // отправить в php на обработку
    // var newData = new FormData();
    // if (document.getElementById("add_new_scheme").files.length>0)  
    //     newData.append("add_new_scheme", document.getElementById("add_new_scheme").files[0],document.getElementById("add_new_scheme").files[0].name); 
   
    // newData.append("floor", floor);    
    // newData.append("number", number);
    // $.ajax({
    //     type: "POST",
    //     url: '/../../php/admin_edit_mode/admin_add_new_office.php',
    //     data: newData,        
    //     async: false,
    //     cache: false,
    //     processData: false,
    //     success: function (result) { 
    //         let info=JSON.parse(result);
    //         alert(info);
    //         if (info=='Добавлено!') 
    //             //обновляем страницу
    //             location.reload();
    //     },
    //     error: function (result) { alert(JSON.parse(result));
    //     },
    //     contentType: false,
    // });      
}