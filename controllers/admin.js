var Fundraisers = require('../models/Blog');
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

