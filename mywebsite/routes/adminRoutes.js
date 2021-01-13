const express   =require('express'),
      User      =require('../models/userModel'),
      Blog      =require('../models/sanatModel'),
      passport  =require("passport"),
      router    =express.Router();


//  





let adminActions=[
    {
        actionId:1,
        actionName:"changeHome",
        displayName:"Anasayfayı Düzenle"
    },
    {
        actionId:2,
        actionName:"changeAbout",
        displayName:"Hakkımda Sayfasını Düzenle"
    },
    {
        actionId:3,
        actionName:"addYagliBoya",
        displayName:"Yağlı Boya İçin Ekleme Yap"
    },
    {
        actionId:4,
        actionName:"addSuluBoya",
        displayName:"Sulu Boya İçin Ekleme Yap"
    },
    {
        actionId:5,
        actionName:"addMozaik",
        displayName:"Mozaik İçin Ekleme Yap"
    },
    {
        actionId:6,
        actionName:"listAll",
        displayName:"Tüm Eklemeleri Görüntüle"
    }

]






router.get("/admin", isLoggedIn, (req, res)=>{
    res.render("admin/admin",{adminActions:adminActions});
});



router.get("/signin", (req, res)=>{
    res.render("admin/signin");
});

router.post("/signin", passport.authenticate("local",
    {
        successRedirect:"/",
        failureRedirect:"/signup"
    }),(req,res)=>{
});


router.get("/signup", (req, res)=>{
    res.render("admin/signup");
});

router.post("/signup", isLoggedIn, (req, res)=>{
    
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password,(err, newCreatedUser)=>{
        if(err){
            console.log(err);
            res.redirect("/signup");
        }
        //user ı authenticate yaptım
        passport.authenticate("local")(req,res, ()=>{
            res.redirect("/");
        });
    })

    
});

router.get("/addMozaik", (req, res)=>{
    res.render("admin/addMozaik");
});

router.post("/addMozaik", (req, res)=>{
    var title=req.body.data.title,
        comImage=req.body.data.comImage,
        comSentence=req.body.data.comSentence,
        blog=req.body.data.blog;
    
    var addMozaik={ title:title, comSentence:comSentence, blog:blog}

    Blog.create(addMozaik)
    .then(()=>{
        console.log(addMozaik);
        res.status(201).json(addMozaik);

    })
    .catch((err)=>{
        console.log("=================ERROR  ERROR  ERROR ====================");
        console.log(err);
        res.send(err);
    });

});

router.get('/sanats/:blogId', (req,res)=>{
    Blog.findById(req.params.blogId)
    .then((foundBlog)=>{
        res.render("sanat/showMozaik",{foundBlog:foundBlog});

    })
    .catch((err)=>{
        console.log("=================ERROR  ERROR  ERROR ====================");
        console.log(err);
        res.send(err);
    })
});

router.get("/mozaik", (req,res)=>{
    Blog.find({} , (err, foundBlogs)=>{
        if (err) {
            console.log("=================ERROR  ERROR  ERROR ====================");
            console.log(err);
        } 
        else{
            console.log("=================ALL BLOGS ====================");
            console.log(foundBlogs);
            res.render("sanat/mozaik", {foundBlogs:foundBlogs});
        }        
    });
});


router.get("/addYagliBoya", (req, res)=>{
    res.render("admin/addYagliBoya");
});

router.post("/addYagliBoya", (req, res)=>{
    var title=req.body.data.title,
        comImage=req.body.data.comImage,
        comSentence=req.body.data.comSentence,
        blog=req.body.data.blog;
    
    var addYagli={ title:title, comSentence:comSentence, blog:blog}

    Blog.create(addYagli)
    .then(()=>{
        console.log(addYagli);
        res.status(201).json(addYagli);

    })
    .catch((err)=>{
        console.log("=================ERROR  ERROR  ERROR ====================");
        console.log(err);
        res.send(err);
    });

});

router.get("/addSuluBoya", (req, res)=>{
    res.render("admin/addSuluBoya");
});

router.post("/addSuluBoya", (req, res)=>{
    var title=req.body.data.title,
        comImage=req.body.data.comImage,
        comSentence=req.body.data.comSentence,
        blog=req.body.data.blog;
    
    var addSulu={ title:title, comSentence:comSentence, blog:blog}

    Blog.create(addSulu)
    .then(()=>{
        console.log(addSulu);
        res.status(201).json(addSulu);

    })
    .catch((err)=>{
        console.log("=================ERROR  ERROR  ERROR ====================");
        console.log(err);
        res.send(err);
    });

});

//post u data vermemiz gereken durumlarda kullanırız. Signoutta herhangi bir 
//data kullanmamız gerekmediğinden post kullanmıyoruz.
router.get("/signout",(req,res)=>{
    req.logOut();
    res.redirect("/");

});
//middle değeri oluşturuldu
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/signin");
}


module.exports = router;

    