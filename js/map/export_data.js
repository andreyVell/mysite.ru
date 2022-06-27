document.getElementById('button_export_data').setAttribute('onclick','exportToExcel()');

document.getElementById('button_export_data').addEventListener('click', function () {
    event.preventDefault(); // Убираем событие отправки формы (убираем перезагрузку страницы) 
});

function exportToExcel()
{        
    //получаем инфу
    var all_booking_info;
    $.ajax({
        type: "POST",
        url: '/../../php/map/get_all_data_for_export.php',
        async: false,
        cache: false,
        processData: false,
        success: function (result) { 
            all_booking_info=JSON.parse(result);
        },
        error: function (result) { alert(JSON.parse(result));
        },
        contentType: false,
    });    
    //заголовки
    all_booking_info.unshift([["Фамилия"], ["Имя"],["Отчество"],["Этаж"],["Номер офиса"],["Номер рабочего места"],["Спецификация рабочего места"],["Дата начала"] ,["Дата конца"]]);
    const title="Exported_Booking_History";
    const xls = new XlsExport(all_booking_info, title);
    xls.exportToXLS('Exported_Booking_History.xls');
      
}