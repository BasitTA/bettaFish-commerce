//===============
//[DECLARATION]
//===============
var express=require("express"),             //express(framework)
    app=express(),                      
    bodyParser=require("body-parser"),      //body-parser
    mongoose=require("mongoose"),           //mongoose
    passport=require("passport"),           //passport[USED FOR USER AUTHENTICATION] ttg keaslian pengguna
    LocalStrategy=require("passport-local"),//passport-local[USED FOR LOCAL AUTH]]
    Betta=require("./models/betta"),        //BettaSchema[DATAS OF FISH]
    Comment=require("./models/comment"),    //CommentSchema[COMMENT OF FISH]
    User=require("./models/user"),          //UserSchema[USED FOR AUTHENTICATION]
    seedDB=require("./seeds"),              //Seeding database
    methodOverride=require("method-override");//Method-override[USED FOR ADDING RESTFUL ROUTING]

//requiring routes
var commentRoutes=require("./routes/comment"),
    bettaFishRoutes=require("./routes/bettaFish"),
    indexRoutes=require("./routes/index");

//===============
//[CONFIGURATION]
//===============

//Connecting data to mongo DB
mongoose.connect("mongodb://localhost/betta_fish9", { useNewUrlParser: true});  //connecting to DB called "betta_fish5"
app.set("view engine", "ejs");                      //used view-engine[FOR READING FILE ".ejs"]
app.use(bodyParser.urlencoded({extended:true}));    //use body-parser[FOR CALLING DATAS]
app.use(express.static(__dirname+"/public"));       //declare public directory
app.use(methodOverride("_method"));                 //use method-override[FOR USING RESTFUL ROUTES CONVENTION]

//Taken from "seeds.js"
// seedDB();                                           //use function called seedDB()

//[PASSPORT CONFIGURATION]
app.use(require("express-session")({
    secret:"It's secret and you know it",
    resave:false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//allow username in every route
app.use(function(req, res, next){
   res.locals.currentUser=req.user;
   next();
});

//Providing prefix to every single routes || ex: app.use("/prefix", routes)
app.use("/bettaFish", bettaFishRoutes);
app.use("/bettaFish/:id/comment", commentRoutes);
app.use(indexRoutes);

app.listen(process.env.PORT || 8080, process.env.IP, function(){
   console.log("Your apps is running"); 
});