function readURL(input) {
    if (input.files && input.files[0]) {
     var reader = new FileReader();
       
     reader.onloadend = function(e) {
      $('#office_scheme_add_new').attr('src', e.target.result);
     }
       
     reader.readAsDataURL(input.files[0]);
    }
   }
   $("#add_new_scheme").change(function() {
    readURL(this);
   });