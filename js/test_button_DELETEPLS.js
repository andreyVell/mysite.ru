document.getElementById('test_css_styles').addEventListener("click",function(e){
    alert(window.getComputedStyle(document.getElementById('div_get_css')).left);
});