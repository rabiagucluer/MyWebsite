var mongoose             = require("mongoose"),
    passportLocalMongoose= require("passport-local-mongoose");


var UserShema = new mongoose.Schema({

    name:{ type: String},
    username: {type:String, unique:true},
    password: {type:String}
});

UserShema.plugin(passportLocalMongoose);

var User=mongoose.model("User",UserShema);
module.exports=User;
