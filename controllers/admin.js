var Blog        = require('../models/Blog');
var Fundraiser  = require('../models/Fundraiser');
var bookshelf   = require('../config/bookshelf');
var Charity  = require('../models/Charity');

/**
 * GET /
 */
exports.index = function(req, res) {
  res.render('admin/index', {
    title: 'Admin'
  });
};


//------------------BLOG STUFF---------------------//
exports.viewBlogs = function(req, res) {
  bookshelf.knex.select().from('blogs').then(function(blogs){
    console.log(blogs);
    res.render('admin/Blogs/viewBlogs', {
        title: 'view blogs',
        blogs:blogs
      });
  });
};

//function called when user creates a blog 
//called from ajax function 
//when created returns json
exports.createBlog = function(req, res) {
  req.assert('title', 'title cannot be blank').notEmpty();
  req.assert('content', 'content cannot be blank').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    req.flash('error', errors);
    res.send("error");
  };
  
  Blog.forge({
    title:req.body.title,
    content:req.body.content
  }).save()
  .then(function () {
      req.flash('success', { msg: 'Thank you! Your blog has been posted' });
      res.send("success");
  });
};

/**
 * Response to ajax call 
 * takes id and updates the record.
 * todo validate id 
 **/
exports.editBlog = function(req,res){
  Blog.forge({blogId:34})
  .save({
    title:req.body.title,
    content:req.body.content
  }).then(function () {
       req.flash('success', { msg: 'Your blog has been updated' });
       res.send("success");
  });
};

exports.deleteBlog = function(req,res){
  var id = req.body.id
    Blog.forge({blogId:id})
  .save({
   deleted_at: knex.fn.now()
  }).then(function () {
       req.flash('success', { msg: 'Your blog has been updated' });
       res.send("success");
  });
  
};

exports.viewBlog = function(req,res){
  var blogId = req.params.blogId; // get the parameter passed
    //todo validation
    bookshelf.knex.from('blogs').where('blogId', blogId).first()
    .then(function(blog){
      console.log(blog);
       res.render('admin/Blogs/viewBlog', {
        title: 'Blog',
        blog:blog
      });
  });
};

//----------------------Charity Stuff-------------------------\\

exports.viewCharities = function(req, res) {
  bookshelf.knex.select().from('charities').then(function(charities){
    console.log(charities);
    res.render('admin/Charities/viewCharities', {
        title: 'view blogs',
        charities:charities
      });
  });
};

/**
 * Response to ajax call 
 * takes id and updates the record.
 * todo validate id 
 **/
exports.createCharity = function(req, res) {
  // req.assert('email', 'title cannot be blank').notEmpty();
  // req.assert('name', 'title cannot be blank').notEmpty();
  // req.assert('content', 'content cannot be blank').notEmpty();

  console.log(req.body);
  var errors = req.validationErrors();

  if (errors) {
    req.flash('error', errors);
    res.send("error");
  }
  
  Charity.forge({
    email:req.body.email,
    name:req.body.name,
    content:req.body.content
  }).save()
  .then(function () {
      req.flash('success', { msg: 'Thank you! Your Charity has been posted' });
      res.send("success");
  });
};

/**
 * Response to ajax call 
 * takes id and updates the record.
 * todo validate id 
 **/
exports.editCharity = function(req,res){
  Blog.forge({blogId:34})
  .save({
    title:req.body.title,
    content:req.body.content
  }).then(function () {
       req.flash('success', { msg: 'Your blog has been updated' });
       res.send("success");
  })
  
};

exports.viewCharity = function(req,res){
  var blogId = req.params.blogId; // get the parameter passed
    //todo validation
    bookshelf.knex.from('blogs').where('blogId', blogId).first()
    .then(function(blog){
      console.log(blog);
       res.render('admin/Blogs/viewBlog', {
        title: 'Blog',
        blog:blog
      });
  });
};