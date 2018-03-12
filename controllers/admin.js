var Blog = require('../models/Blog');
var bookshelf = require('../config/bookshelf');
/**
 * GET /
 */
exports.index = function(req, res) {
  res.render('admin/index', {
    title: 'Admin'
  });
};

exports.viewBlogs = function(req, res) {
  bookshelf.knex.select().from('blogs').then(function(blogs){
    console.log(blogs);
    res.render('admin/viewBlogs', {
        title: 'view blogs',
        blogs:blogs
      });
  });
};

//function called when user creates a blog 
//called from ajax function 
//when created returns json
exports.postBlogs = function(req, res) {
  req.assert('title', 'title cannot be blank').notEmpty();
  req.assert('content', 'content cannot be blank').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    req.flash('error', errors);
    res.send("error");
  }
  
  Blog.forge({
    title:req.body.title,
    content:req.body.content
  })
  .save()
  .then(function () {
      req.flash('success', { msg: 'Thank you! Your blog has been posted' });
      res.send("success");
  });
   
};