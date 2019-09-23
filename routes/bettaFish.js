var express=require("express");
var router=express.Router();
var Betta=require("../models/betta");

//======================
//[ROUTING]
//======================
//[BETTA FISH CONTENT]
//======================

//MIDDLEWARE
//create rules(function) that user need to login, if they want to create a new Betta Fish or ect.
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
function checkBettaFishOwner(req, res, next){
    if(req.isAuthenticated()){
        Betta.findById(req.params.id, function(err, foundBettaFish){
           if(err){
               console.log(err);
           }else{
               //id author pada saat penambahan konten harus sama dengan id user yang login sekarang
               if(foundBettaFish.author.id.equals(req.user._id)){
                   next();
               }else{
                   res.redirect("back"); //redirecting back to the current page
               }
           }
        });
    }else{
      res.render("login");  
    }
}

//[NEW] DISPLAYING FORM TO MAKE A NEW FISH
router.get("/new", isLoggedIn, function(req, res){
   res.render("bettaFish/newFish"); 
});

//[INDEX] VIEW FISH PAGE
router.get("/", function(req, res){
    Betta.find({}, function(err, allBettaFish){
        if(err){
            console.log(err);
        }else{
            res.render("bettaFish/index", {fishData:allBettaFish}); 
        }
    });
});

//[CREATE] POSTING NEW FISH
router.post("/", isLoggedIn, function(req, res){
    //need to declare variable of all datas because it used only "name","color","image","description" in form (property of name) 
    var name=req.body.name,
        color=req.body.color,
        image=req.body.image,
        description=req.body.description;
    var author={                            //Declare author "id & name" (who has logged in)
        id: req.user._id,
        username: req.user.username
    };
    var bettaFish={name:name, color:color, image:image, description:description, author:author};
    
    //create and send data to DB
    Betta.create(bettaFish, function(err,newlyCreated){
       if(err){
           console.log(err);
       } else{
           res.redirect("/bettaFish");
       }
    });
});

//[SHOW] SHOWING ONE SPECIFIC FISH PAGE
router.get("/:id", function(req, res){
    
    //populating comments
    Betta.findById(req.params.id).populate("comments").exec(function(err, foundBettaFish){
        if(err){
            console.log(err);
        }else{
            res.render("bettaFish/show", {bettaFish: foundBettaFish});
        }
    });
    // req.params.id;
});

//[EDIT] EDITING ON "FORM EDIT" FROM EXISTING FISH DATAS 
router.get("/:id/edit", checkBettaFishOwner, function(req, res){
    Betta.findById(req.params.id, function(err, foundBettaFish){
          res.render("bettaFish/edit", {bettaFish: foundBettaFish});
    });
});

//[UPDATE] UPDATING DATA TO DATABASE
router.put("/:id", checkBettaFishOwner, function(req, res){
    Betta.findByIdAndUpdate(req.params.id, req.body.bettaFish, function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect("/bettaFish/"+req.params.id);
        }
    });
});

//[DELETE/DESTROY] DELETING BETTA FISH DATA FROM DATABASE
router.delete("/:id", checkBettaFishOwner, function(req, res){
   Betta.findByIdAndRemove(req.params.id, function(err){
      if(err){
          console.log(err);
      }else{
          res.redirect("/bettaFish");
      }
   }); 
});

module.exports=router;