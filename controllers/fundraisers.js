var Fundraisers = require('../models/Fundraiser');
var bookshelf = require('../config/bookshelf');

exports.index = function(req, res) {
  bookshelf.knex.from('fundraisers').leftJoin('charities', 'fundraisers.id', 'charities.id').then(function(fundraisers){
    console.log(fundraisers);
    res.render('fundraisers/index', {
      title: 'Fundraisers',
      fundraisers : fundraisers
    });
  });
};


exports.view = function(req, res) {
    bookshelf.knex.from('fundraisers').leftJoin('charities', 'fundraisers.id', 'charities.id').first()
    .then(function(fundraiser){
      console.log(fundraiser);
       res.render('fundraisers/about', {
        title: 'Fundraiser',
        fundraiser:fundraiser
      });
    });
  };
  
exports.createGet = function(req,res){
    bookshelf.knex.select('id','name').from('charities').then(function(charities){
    console.log(charities);
    res.render('fundraisers/create', {
        title: 'Create new fundraiser',
        charities:charities
      });
    });
}

exports.createPost = function(req,res){
 
  /** todo validation **/

  var errors = req.validationErrors();

  if (errors) {
    req.flash('error', errors);
    return res.redirect('/blog/new');
  }
  
  console.log(req);
 
  Fundraisers.forge({
    title:req.body.title,
    content:req.body.content,
    walletAddress:req.body.walletAddress,
    charity:req.body.charitySelect
  }).save().then(function () {
      req.flash('success', { msg: 'Thank you! Your blog has been created' });
      res.redirect('/fundraisers');
    });  
 };
    
    