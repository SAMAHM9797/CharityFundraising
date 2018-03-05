var bookshelf = require('../config/bookshelf');

var Blog = bookshelf.Model.extend({
  tableName: 'blogs',
  hasTimestamps: true
});


module.exports = Blog;