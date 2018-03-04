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
