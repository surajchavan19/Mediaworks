const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth')

//Welcome page
router.get("/",function(req,res){
  res.render("welcome");
})

//Dashboard
// router.get("/home", ensureAuthenticated, function(req,res){
//   res.render("home");
// })







module.exports = router;
