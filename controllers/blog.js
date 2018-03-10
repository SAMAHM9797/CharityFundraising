var Blog = require('../models/Blog');

/**
 * GET /
 */
exports.index = function(req, res) {
  Blog.forge().fetchAll().then(function(blogs){
    res.render('blog/index', {
      title: 'Blog',
      blogs: blogs.serialize()
    });
  });
};

/**
 * Get create new Blog Page
 * */
exports.blogGet = function(req, res) {
    res.render('blog/create', {
      title: 'New Blog',
  });
};

//create new blog post (only for admins)
exports.blogPost = function(req, res) {
  req.assert('title', 'title cannot be blank').notEmpty();
  req.assert('content', 'content cannot be blank').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    req.flash('error', errors);
    return res.redirect('/blog/new');
  }
  
  Blog.forge({
    title:req.body.title,
    content:req.body.content
  })
  .save()
  .then(function () {
      req.flash('success', { msg: 'Thank you! Your blog has been posted' });
      res.redirect('/blog');
  });
 };
