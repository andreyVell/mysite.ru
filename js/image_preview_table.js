FReader = new FileReader();
 
// событие, когда файл загрузится
FReader.onload = function(e) {
    document.querySelector("#avatar_edit_note").src = e.target.result;    
};
 
// выполнение функции при выборки файла
document.querySelector(".uploadImageTable").addEventListener("change", loadImageFile);
// функция выборки файла
function loadImageFile() {
    var file = document.querySelector(".uploadImageTable").files[0];
    FReader.readAsDataURL(file);
}