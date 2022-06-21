function readURL(input) {
    if (input.files && input.files[0]) {
     var reader = new FileReader();
       
     reader.onloadend = function(e) {
      $('#avatar_edit_add').attr('src', e.target.result);
     }
       
     reader.readAsDataURL(input.files[0]);
    }
   }
   $("#new_avatar").change(function() {
    readURL(this);
   });