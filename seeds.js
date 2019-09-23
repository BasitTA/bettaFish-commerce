var mongoose=require("mongoose");
var Betta=require("./models/betta");
var Comment=require("./models/comment");

var data=[
    {
        name: "Halfmoon",
        color:"Red, white",
        image:"https://4.bp.blogspot.com/-97wWSk8Sqpo/WBng_jWKumI/AAAAAAAAAFE/dIRfUWFPy6MPIQ11bF0uSRn7KCpvnNRpwCK4B/s1600/red-dragon-butterfly-2.jpg", 
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Serit",
        color:"Blue, yellow",
        image:"https://www.duniaq.com/success/wp-content/uploads/2015/06/Ikan-Cupang-Serit.jpg", 
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Plakat",
        color:"Black, white", 
        image:"https://i.pinimg.com/236x/cf/b2/39/cfb2397743c34921b26f5ad2e149d066.jpg", 
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
];

function seedDB(){
    //Remove all bettas fish from DB
    Betta.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("Betta has removed!");
        //Remove all comments from DB
        Comment.remove({}, function(err){
            if(err){
                console.log(err);
            }
            console.log("Comment has removed!");
            //for every data (a.k.a use forEach)
            data.forEach(function(seed){
                //create a new betta fish
                Betta.create(seed, function(err, betta){
                   if(err){
                       console.log(err);
                   }else{
                       console.log("Added a Betta");
                       //create a new comment
                       Comment.create(
                           {
                               text: "One of the Most Beatiful Creature in Aquarium",
                               author:"Breeder"
                           }, function(err, comment){
                               if(err){
                                   console.log(err);
                               }else{
                                   //push and save new comment to DB
                                   betta.comments.push(comment._id);
                                   betta.save();
                                   console.log("Created new comment");
                               }
                        });
                   }
                });
            });
            
        });
    });
}

module.exports=seedDB;