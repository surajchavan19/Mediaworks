const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const passport = require('passport');
//User model
const User = require('../models/User')
// login page
router.get("/login",function(req,res){
  res.render("login");
})

// Register page
router.get("/register",function(req,res){
  res.render("register");
})

// Register Handle
router.post('/register',function(req,res){
  console.log(req.body);
  const { name, email, password, password2} = req.body
  let errors = [];


  //Check required fields
  if (!name || !email || !password || !password2) {
    errors.push({msg: "Please fill in  all fields"});
  }

  //Check password match
  if (password !== password2) {
    errors.push({msg: "Passwords do not match"});
  }

  //Check password length
  if (password.length < 6) {
    errors.push({msg: "Password should be atleast 6 characters"});
  }
  console.log(errors);
  console.log(errors.length);

  if (errors.length > 0) {
   res.render('register',{
     errors,
     name,
     email,
     password,
     password2
   });
  }else{
    User.findOne({email : email})
    .then(user => {
      if (user) {
        //User exists
        errors.push({msg: "Email is already registered"});
        res.render('register',{
          errors,
          name,
          email,
          password,
          password2
        });
      }else{
       const newUser = new User({
         name,
         email,
         password

       });
       //Hash password
       bcrypt.genSalt(10,(err,salt) => bcrypt.hash(newUser.password, salt, (err,hash) =>{
         if (err) throw err;
         //Set password to hashed
         newUser.password = hash;
         //Save user
         newUser.save()
          .then(user => {
            req.flash('success_msg',"You are now registered and can login")
            res.redirect('/users/login')
          })
          .catch(err => console.log(err))

       }))
      }
    });
  }

});


// Login Handle

router.post('/login',function(req,res,next){
  passport.authenticate('local',{
    successRedirect: '/home',
    failureRedirect: '/users/login',
    failureFlash: true

  })(req,res,next);
});

//Logout handle
router.get('/logout', function(req,res){
  req.logout();
  req.flash('success_msg','You are logged out')
  res.redirect('/users/login')
})




module.exports = router;
