var bookshelf = require('../config/bookshelf');

var Blog = bookshelf.Model.extend({
  tableName: 'blogs'
});


module.exports = Blog;