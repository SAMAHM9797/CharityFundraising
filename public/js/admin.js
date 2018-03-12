$("#newBlog").click(function() {
  alert( "Handler for .click() called." );
});

$("#newBlogForm").submit(function(e) {

    var url = "/admin/blogs"; // the script where you handle the form input.

    $.ajax({
           type: "POST",
           url: url,
           data: $("#newBlogForm").serialize(), // serializes the form's elements.
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


$("#editBlogForm").submit(function(e) {
    var url = "/admin/blogs/edit"; // the script where you handle the form input.
    $.ajax({
           type: "POST",
           url: url,
           data: $("#editBlogForm").serialize(), // serializes the form's elements.
           success: function(data)
           {
               alert(data); // show response from the node.js
               $('#editModal').modal('toggle');
               $('#table tr:last').after('<tr>...</tr><tr>...</tr>');
           }
         });

    console.log("posted");
    
    e.preventDefault(); // avoid to execute the actual submit of the form.
});




