//http server ı kurulacak ve indirdiğimiz tüm paketler projeye dahil edilmeli
const   mongoose      =require("mongoose"),
        express       =require("express"),
        passport      =require("passport"),
        LocalStrategy =require("passport-local"),
        User          =require("./models/userModel"),
        expressSession=require("express-session"),
        bodyParser    =require("body-parser"),
        app           =express();



//body-parser body deki elementeleri almamızı sağlar.
//Admin sayfasında kullanıcı grişindeki email ve şifreyi bu methodla alabiliriz.


//Routes-- diğer file ı ana file a dahil ettik
var indexRoutes=require("./routes/indexRoutes"),
    adminRoutes=require("./routes/adminRoutes"),
    sanatRoutes=require("./routes/sanatRoutes");

//boilerplate kodlar: yazmamız gereken basmaklıplar,
//kendini tekrar eden kodlar

mongoose.Promise = global.Promise;

//App config

mongoose
     .connect( 'mongodb://localhost/Webapp', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
     .then(() => console.log( 'Database Connected' ))
     .catch(err => console.log( err ));

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

/*function getResponse(response){
    var serverData='';
    response.on('data', function(chunk){
            serverData += chunk;
    });
response.on('end', function(){
            console.log(serverData);
    });
};*/

//Passport config
app.use(require("express-session")({
    secret:"Güvenlik cümlesi",
    resave:false,
    saveUninitialized:false
}));

//kullanıcının browserda olduğunu gösteren yapı express.session
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




//user artık authenticate ile sisteme alındı

//şu anlık kullanıcının bilgisini tüm route lar içinde paylaş

app.use((req,res,next)=>{
    res.locals.currentUser=req.user;
    next();

});




//Routes Using
app.use(indexRoutes);
app.use(adminRoutes);
app.use(sanatRoutes);

//http modülünü çağırıp server ı create edecek
var server=app.listen(3000,(err)=>{
    if(err)
        console.log(err);
    console.log('App started. Port number : %d ',server.address().port);
});

//package kullanmamızın bir sebebi de kullanıcı şifrelerini kriptolamasından kaynaklı.



