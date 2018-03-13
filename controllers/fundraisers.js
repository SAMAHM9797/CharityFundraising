var Fundraisers = require('../models/Fundraiser');
var bookshelf = require('../config/bookshelf');

exports.index = function(req, res) {
  // bookshelf.knex.from('fundraisers').leftJoin('charities', 'fundraisers.id', 'charities.id').then(function(fundraisers){
  bookshelf.knex.select().from('fundraisers').then(function(fundraisers){
    console.log(fundraisers);
    res.render('fundraisers/index', {
      title: 'Fundraisers',
      fundraisers:fundraisers
    });
  });
};

//this is depreciated and no longer needed
exports.view = function(req, res) {
  console.log(req.params.fundId);
    bookshelf.knex.from('fundraisers').leftJoin('charities', 'fundraisers.id', 'charities.id').first()
    .then(function(fundraiser){
      console.log(fundraiser);
       res.render('fundraisers/about', {
        title: 'Fundraiser',
        fundraiser:fundraiser
      });
    });
  };
  
//view a certain fundraiser
exports.viewOne = function(req, res) {
    
    var fundId = req.params.fundId; // get the parameter passed
    //todo validation
    
    bookshelf.knex.from('fundraisers').leftJoin('charities', 'fundraisers.id', 'charities.id').where('fundraisers.id', fundId).first()
    .then(function(fundraiser){
      console.log(fundraiser);
       res.render('fundraisers/about', {
        title: 'Fundraiser',
        fundraiser:fundraiser
      });
    });
  };

//this is depreciated and no longer needed  
exports.createGet = function(req,res){
    bookshelf.knex.select('id','name').from('charities').then(function(charities){
    console.log(charities);
    res.render('fundraisers/create', {
        title: 'Create new fundraiser',
        charities:charities
      });
    });
}
//this is depreciated and no longer needed
exports.createPost = function(req,res){
  /** todo validation **/
  var errors = req.validationErrors();
  if (errors) {
    req.flash('error', errors);
    return res.redirect('/fundraisers/create');
  }
  console.log(req.body);
  Fundraisers.forge({
    title:req.body.title,
    content:req.body.content,
    walletAddress:req.body.walletAddress,
    charity:req.body.charitySelect
  }).save().then(function () {
      req.flash('success', { msg: 'Thank you! Your fundraiser has been created' });
      res.redirect('/fundraisers');
    });  
 };
    
    