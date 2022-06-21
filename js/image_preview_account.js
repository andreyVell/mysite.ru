FReader = new FileReader();
 
// событие, когда файл загрузится
FReader.onload = function(e) {
    document.querySelector("#avatar_edit").src = e.target.result;    
};
 
// выполнение функции при выборки файла
document.querySelector(".uploadImage").addEventListener("change", loadImageFile);
// функция выборки файла
function loadImageFile() {
    var file = document.querySelector(".uploadImage").files[0];
    FReader.readAsDataURL(file);
}