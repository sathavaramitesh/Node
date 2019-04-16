var user = require('../app/controllers/user');
var multer  =   require('multer');
var validation = require('./middleware');
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/img/');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});

var upload = multer({ storage: storage });
//you can include all your controllers

module.exports = function (app, passport) {

    app.post('/register',validation.register,user.register);
    app.post('/login',validation.login,user.login);
    // app.get('/login', home.login);
    // app.post('/postLogin', home.postLogin);
    // app.get('/signup', home.signup);
    // app.get('/logout', home.logout);

    // app.get('/', home.loggedIn, home.home);//home
    // app.get('/home', home.loggedIn, home.home);//home

    // // user list 

    // app.get('/add',home.add);
    // app.post('/addPost',upload.single('image'),home.addPost);
    // app.get('/userList',home.loggedIn,home.getUser);
    // app.get('/edit/:id',home.loggedIn,home.edit);
    // app.post('/editPost/:id',home.loggedIn,upload.single('image'),home.editPost);
    // app.get('/delete/:id',home.loggedIn,home.delete);

    // app.post('/signup', passport.authenticate('local-signup', {
    //     successRedirect: '/home', // redirect to the secure profile section
    //     failureRedirect: '/signup', // redirect back to the signup page if there is an error
    //     failureFlash: true // allow flash messages
    // }));
    // // process the login form
    // app.post('/login', passport.authenticate('local-login', {
    //     successRedirect: '/home', // redirect to the secure profile section
    //     failureRedirect: '/login', // redirect back to the signup page if there is an error
    //     failureFlash: true // allow flash messages
    // }));


}
