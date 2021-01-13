var mongoose = require("mongoose");

var siteShema = new mongoose.Schema({

    homeImage   : {type:Image, required: "Cannot be empty" },
    aboutImage  : {type:Image, required: "Cannot be empty" },
    aboutText   : {type:Image, required: "Cannot be empty" },
    contactImage: {type:Image, required: "Cannot be empty" },
    contactText : {type:String, required: "Cannot be empty" }

});


module.exports = mongoose.model("Site",siteShema);
