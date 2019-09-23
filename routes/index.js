var express=require("express");
var router=express.Router();
var User=require("../models/user");
var passport=require("passport");

//=============================
//[AUTHENTICATION ROUTES]
//=============================

//[ROOTS] REDIRECTING TO [INDEX]
router.get("/", function(req, res){
   res.redirect("/bettaFish"); 
});

//[REGISTER] BRING TO REGISTER FORM
router.get("/register", function(req, res){
    res.render("register");
});

//[REGISTER(POST)] PROCESSING DATA FROM USER ADN REDIRECT TO "/bettaFish"
router.post("/register", function(req, res){
    var newUser=new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
       if(err){
           console.log(err);
           return res.render("register");
       } 
       passport.authenticate("local")(req, res, function(){
          res.redirect("/bettaFish"); 
       });
    });   
});

//[LOGIN] USER LOGIN
router.get("/login", function(req, res){
    res.render("login");
});

//[LOGIN(POST)] REDIRECTING DATA TO "/bettaFish"" IF SUCCESS
//app.post("login", middleware, callback)
router.post("/login", passport.authenticate("local", { 
        successRedirect: "/bettaFish",
        failureRedirect: "/login"
    }), function(req, res){
});

//[LOGOUT] 
router.get("/logout", function(req, res){
   req.logout();
   res.redirect("/");
});


//MIDDLEWARE
// //create rules(function) that user need to login, if they want to create a new comment or ect.
// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
// }

module.exports=router;