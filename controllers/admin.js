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
  .then(function (blog) {
      console.log(blog.toJSON());
      req.flash('success', { msg: 'Thank you! Your blog has been posted' });
      res.send(blog.toJSON());
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
    Blog.forge({id})
  .save({
   deleted_at:new Date()
  }).then(function () {
       req.flash('success', { msg: 'Your blog has been deleted' });
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


//----------------------FundraiserStuff-------------------------\\

//DONT GO ABOVE HERE\\

// exports.viewFundraisers = function(req, res) {
//   bookshelf.knex.select().from('fundraisers').then(function(fundraisers){
//     console.log(fundraisers);
//     res.render('admin/Fundraisers/viewFundraisers', {
//         title: 'view Fundraisers',
//         fundraisers:fundraisers
//       });
//   });
// };

/**
 * Response to ajax call 
 * takes id and updates the record.
 * todo validate id 
 **/
exports.createFundraiser= function(req, res) {
  // req.assert('email', 'title cannot be blank').notEmpty();
  // req.assert('name', 'title cannot be blank').notEmpty();
  // req.assert('content', 'content cannot be blank').notEmpty();

  console.log(req.body);
  var errors = req.validationErrors();

  if (errors) {
    req.flash('error', errors);
    res.send("error");
  }
  
  Fundraiser.forge({
    title:req.body.title,
    content:req.body.content,
    walletAddress:req.body.walletAddress,
    charity:req.body.charity, 
    
  }).save()
  .then(function () {
      req.flash('success', { msg: 'Thank you! Your Fundraiser has been posted' });
      res.send("success");
  });
};

/**
 * Response to ajax call 
 * takes id and updates the record.
 * todo validate id 
 **/
exports.editFundraiser = function(req,res){
  Fundraiser.forge({fundraiserId:34})
  .save({
    title:req.body.title,
    content:req.body.content,
    walletAddress:req.body.walletAddress,
    charity:req.body.charity 
  }).then(function () {
       req.flash('success', { msg: 'Your fundraiser has been updated' });
       res.send("success");
  })
  
};

exports.viewFundraiser = function(req,res){
  var fundraiserId = req.params.fundraiserId; // get the parameter passed
    //todo validation
    bookshelf.knex.from('fundraiser').where('fundraiserId', fundraiserId).first()
    .then(function(fundraiser){
      console.log(fundraiser);
       res.render('admin/Fundraisers/viewFundraisers', {
        title: 'Fundraiser',
        fundraiser:fundraiser
      });
  });
};

exports.viewFundraisers = function(req,res){
  var fundraiserId = req.params.fundraiserId; // get the parameter passed
    //todo validation
    bookshelf.knex.select('*').from('fundraisers').leftJoin('charities', 'fundraisers.id', 'charities.id')
    .then(function(fundraisers){
      console.log(fundraisers);
       res.render('admin/Fundraisers/viewFundraisers', {
        title: 'Fundraiser',
        fundraisers:fundraisers
      });
  });
};


// exports.get= function(req,res){
//   var fundraiserId = req.params.fundraiserId; // get the parameter passed
//     //todo validation
//     bookshelf.knex.select('*').from('fundraisers').leftJoin('charities', 'fundraisers.id', 'charities.id')
//     .then(function(fundraisers){
//       console.log(fundraisers);
//       res.render('admin/Fundraisers/viewFundraisers', {
//         title: 'Fundraiser',
//         fundraiser:fundraisers
//       });
//   });
// };