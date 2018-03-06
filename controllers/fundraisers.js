var Fundraisers = require('../models/Fundraiser');
var bookshelf = require('../config/bookshelf');

exports.index = function(req, res) {
    bookshelf.knex.from('fundraisers').leftJoin('charities', 'fundraisers.id', 'charities.id').first()
    .then(function(fundraiser){
      console.log(fundraiser);
       res.render('fundraisers/about', {
        title: 'Fundraiser',
        fundraiser:fundraiser
      });
    });
  };