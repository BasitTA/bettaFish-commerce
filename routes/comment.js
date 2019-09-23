var express=require("express");
var router=express.Router({mergeParams:true});  //makes accessible :id
var Betta=require("../models/betta");
var Comment=require("../models/comment");

//=============================
//[BETTA FISH COMMENTS ROUTES]
//=============================

//MIDDLEWARE
//create rules(function) that user need to login, if they want to create a new comment or ect.
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

//[NEW COMMENT] SHOWING NEW COMMENT FORM
router.get("/new", isLoggedIn, function(req, res){
    //find by id
    Betta.findById(req.params.id, function(err, foundComment){
        if(err){
            console.log(err);
        }else{
            res.render("comment/newComment", {bettaFish: foundComment});
        }
    });
});

//[CREATE COMMENT] CREATE NEW COMMENT & STORE TO DB
router.post("/", isLoggedIn, function(req, res){
    //Doesn't need to declare variable because it used "comment[name]", different from CREATE route in BETTA FISH CONTENT upper
    Betta.findById(req.params.id, function(err, betta){
        if(err){
            console.log(err);
        }else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }else{
                    comment.author.id=req.user._id;
                    comment.author.username=req.user.username;
                    comment.save();
                    betta.comments.push(comment);
                    betta.save();
                    console.log(comment.author.username);
                    res.redirect("/bettaFish/"+betta._id);
                }
            });
        }
    });
});

router.get("/:comment_id/edit", function(req,res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect('back');
        }else{
            res.render('comment/editComment',{bettaFish_id:req.params.id, comment:foundComment})
        }
    })
});

module.exports=router;