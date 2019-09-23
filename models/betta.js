var mongoose=require("mongoose");

//SCHEMA SETUP
var bettaSchema = new mongoose.Schema({
    name: String,
    color: String,
    image: String,
    description: String,
    author:{
      id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
      },
      username: String
    },
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

//CONVERT TO MODEL
module.exports = mongoose.model("Betta", bettaSchema);