var bookshelf = require('../config/bookshelf');
var Charity   = require('./Charity');

var Fundraiser = bookshelf.Model.extend({
  tableName: 'fundraisers',
  hasTimestamps: true,
  charity : function(){
      return this.belongsTo(Charity,'charityId');
    }
});


module.exports = Fundraiser;