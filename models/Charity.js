var bookshelf = require('../config/bookshelf');
var Fundraiser  = require('./Fundraiser');

var Charity = bookshelf.Model.extend({
  tableName: 'charities',
  hasTimestamps: true,
  fundraisers: function(){
       return this.hasMany(Fundraiser,'fundraisersId');
  }
});


module.exports = Charity;