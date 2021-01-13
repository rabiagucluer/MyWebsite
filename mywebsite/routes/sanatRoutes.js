const express   =require('express'),
      mongoose  =require("mongoose"),
      router    =express.Router();

router.get("/yagliboya", (req, res)=>{
    res.render("sanat/yagliboya") ;
});  


router.get("/suluboya", (req, res)=>{
    res.render("sanat/suluboya") ;
}); 
router.get("/mozaik", (req, res)=>{
    res.render("sanat/mozaik") ;
}); 







module.exports = router;