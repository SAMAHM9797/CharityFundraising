var bookshelf = require('../config/bookshelf');
var User = require('./User');

var Charity = bookshelf.Model.extend({
  tableName: 'roles',
  hasTimestamps: true,
  users: function(){
       return this.hasMany(User);
  }
});


module.exports = Charity;