var express = require('express');
var path = require('path');
var logger = require('morgan');
var compression = require('compression');
var methodOverride = require('method-override');
var session = require('express-session');
var flash = require('express-flash');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var dotenv = require('dotenv');
var nunjucks = require('nunjucks');
var passport = require('passport');

// Load environment variables from .env file
dotenv.load();

// Controllers
var HomeController = require('./controllers/home');
var userController = require('./controllers/user');
var contactController = require('./controllers/contact');
var aboutController = require('./controllers/about');
var blogController = require('./controllers/blog');
var fundRaiserController = require('./controllers/fundraisers');
var charityController = require('./controllers/charity');
var adminController = require('./controllers/admin');
// Passport OAuth strategies
require('./config/passport');

var app = express();

// view engine setup
nunjucks.configure('views', {
  autoescape: true,
  express: app
});

app.set('view engine', 'html');
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(methodOverride('_method'));
app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
  res.locals.user = req.user ? req.user.toJSON() : null;
  next();
});
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', HomeController.index);
app.get('/about', aboutController.index);
app.get('/contact', contactController.contactGet);
app.post('/contact', contactController.contactPost);

//fundraises
app.get('/fundraisers', fundRaiserController.index);
app.get('/fundraisers/view/', fundRaiserController.view);
app.get('/fundraisers/:id(\\d+)?/', fundRaiserController.viewOne);
// app.get('/fundraisers/create' , fundRaiserController.createGet);
// app.post('/fundraisers/create' , fundRaiserController.createPost);

//charitites 
app.get('/charities',charityController.index);

//blog stuff
app.get('/blog',blogController.index);
app.get('/blog/create',blogController.blogGet);
app.post('/blog/create',blogController.blogPost);

//admin
app.get('/admin',adminController.index);
//admin/blogs
app.get('/admin/blogs',adminController.viewBlogs);
app.post('/admin/blogs',adminController.createBlog);
app.post('/admin/blogs/edit',adminController.editBlog);
app.post('/admin/blogs/delete',adminController.deleteBlog);
app.get('/admin/blogs/:blogId(\\d+)?/', adminController.viewBlog);
//admin/charities
app.get('/admin/charities',adminController.viewCharities);
app.post('/admin/charities',adminController.createCharity);
app.post('/admin/charities/edit',adminController.editCharity);
// app.post('/admin/charities/delete',adminController.deleteCharity);
app.get('/admin/charities/:charitiesId(\\d+)?/', adminController.viewCharity);
//admin/fundraisers
app.get('/admin/fundraisers',adminController.viewFundraisers);
app.post('/admin/fundraisers',adminController.createFundraiser);
app.post('/admin/fundraisers/edit',adminController.editFundraiser);
app.get('/admin/fundraisers/:fundraisersId(\\d+)?/',adminController.viewFundraiser);


//User stuff
app.get('/account', userController.ensureAuthenticated, userController.accountGet);
app.put('/account', userController.ensureAuthenticated, userController.accountPut);
app.delete('/account', userController.ensureAuthenticated, userController.accountDelete);
app.get('/signup', userController.signupGet);
app.post('/signup', userController.signupPost);
app.get('/login', userController.loginGet);
app.post('/login', userController.loginPost);
app.get('/forgot', userController.forgotGet);
app.post('/forgot', userController.forgotPost);
app.get('/reset/:token', userController.resetGet);
app.post('/reset/:token', userController.resetPost);
app.get('/logout', userController.logout);
app.get('/unlink/:provider', userController.ensureAuthenticated, userController.unlink);
app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'user_location'] }));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }));
app.get('/auth/google', passport.authenticate('google', { scope: 'profile email' }));
app.get('/auth/google/callback', passport.authenticate('google', { successRedirect: '/', failureRedirect: '/login' }));
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', { successRedirect: '/', failureRedirect: '/login' }));


// Production error handler
if (app.get('env') === 'production') {
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.sendStatus(err.status || 500);
  });
}

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
