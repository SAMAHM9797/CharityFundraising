
$(".delete").click(function(e) {
 
  var url = "/admin/blogs/delete"; // the script where you handle the form input.
  var deleteId= $(this).attr("value");
  alert(deleteId);
    $.ajax({
          type: "POST",
          url: url,
          data: {id:deleteId},
          success: function(data)
          {
              alert(data); // show response from the node.js
              $('#createModal').modal('toggle');
              $('#table tr:last').after('<tr>...</tr><tr>...</tr>');
          }
         });

    console.log("posted");
    
    e.preventDefault(); // avoid to execute the actual submit of the form.
});

$("#newBlogForm").submit(function(e) {

    var url = "/admin/blogs"; // the script where you handle the form input.
    var formData =  $("#newBlogForm").serialize()
    console.log(formData);
    $.ajax({
           type: "POST",
           url: url,
           data:formData, // serializes the form's elements.
           success: function(data)
           {
               $('#createModal').modal('toggle');
               $('tbody').append('<tr> <th scope = "row">' + data.id + '</td>'
               +'<td>'+data.title+'</td>'
               +'<td>'+data.content+'</td>'
               +'<td></td>'
               +'<td> <button type="button" class="delete btn btn-danger btn-sm" value="'+data.id+'" data-toggle="modal" data-target="#deleteModal">'
               +'<span class="glyphicon glyphicon-trash"  aria-hidden="true"></span>'
               +'</button>'
               +'<button type="button" class="edit btn btn-danger btn-sm " data-toggle="modal" data-target="#editModal">'
               +'<span class="glyphicon glyphicon-edit"  aria-hidden="true"></span>'
               +'</button>'
               +'</td>'
               +'</tr>'
             
               );
           }
         });

    console.log("posted");
    
    e.preventDefault(); // avoid to execute the actual submit of the form.
});


$("#editBlogForm").submit(function(e) {
    var url = "/admin/blogs/edit"; // the script where you handle the form input.
    $.ajax({
           type: "POST",
           url: url,
           data: $("#editBlogForm").serialize(), // serializes the form's elements.
           success: function(data)
           {
               alert(data.id); // show response from the node.js
               console.log(data.id);
               $('#editModal').modal('toggle');
               $('#table tr:last').after('<tr>...</tr><tr>...</tr>');
           }
         });

    console.log("posted");
    
    e.preventDefault(); // avoid to execute the actual submit of the form.
});

$("#newCharityForm").submit(function(e) {

    var url = "/admin/charities"; // the script where you handle the form input.

    $.ajax({
           type: "POST",
           url: url,
           data: $("#newCharityForm").serialize(), // serializes the form's elements.
           success: function(data)
           {
               alert(data); // show response from the node.js
               $('#createModal').modal('toggle');
               $('#table tr:last').after('<tr>...</tr><tr>...</tr>');
           }
         });

    console.log("posted");
    
    e.preventDefault(); // avoid to execute the actual submit of the form.
});

$("#newFundraiserForm").submit(function(e) {

    var url = "/admin/fundraisers"; // the script where you handle the form input.

    $.ajax({
           type: "POST",
           url: url,
           data: $("#newFundraiserForm").serialize(), // serializes the form's elements.
           success: function(data)
           {
               alert(data); // show response from the node.js
               $('#createModal').modal('toggle');
               $('#table tr:last').after('<tr>...</tr><tr>...</tr>');
           }
         });

    console.log("posted");
    
    e.preventDefault(); // avoid to execute the actual submit of the form.
});


