FReader = new FileReader();
 
// событие, когда файл загрузится
FReader.onload = function(e) {
    document.querySelector("#office_scheme_edit_one").src = e.target.result;    
};
 
// выполнение функции при выборки файла
document.querySelector(".uploadImageEditOneScheme").addEventListener("change", loadImageFile);
// функция выборки файла
function loadImageFile() {
    var file = document.querySelector(".uploadImageEditOneScheme").files[0];
    FReader.readAsDataURL(file);
}