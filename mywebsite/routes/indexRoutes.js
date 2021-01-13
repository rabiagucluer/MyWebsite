const express   = require('express'),
      router    = express.Router();



/*var data = [
        {
            postTitle: "Yağlı boya ",
            postSubTitle:"Kullanılan malzemeler ve ve yapımı",
            image:"images/yag5.png"
        },
        {
            postTitle:"Sulu boya",
            postSubTitle:"Kullanılan malzemeler ve ve yapımı",
            image:"images/sulu3.png"
    
        },
        {
            postTitle:"Mozaik",
            postSubTitle:"Kullanılan malzemeler ve ve yapımı",
            image:"images/moz3.png"
            
    
        }
    
    ]
*/
//anasayfayı çağıran bir route tanımlamam lazım
// Routes


router.get("/", (req, res)=>{
    res.render("home") ;
});  
//ayrıca eklemek istediğimiz sayfalrı da route şeklinde buralara ekledim   






router.get("/about", (req, res)=>{
    res.render("about");
});

router.get("/contact", (req, res)=>{
    res.render("contact");
});




module.exports = router;

    