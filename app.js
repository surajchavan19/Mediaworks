const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var SpotifyWebApi = require('spotify-web-api-node');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport')

const app = express();

//Passport config
require('./config/passport')(passport);

//Db config
const db = require('./config/keys').MongoURI;

//Connect to Mongo
mongoose.connect(db,{ useNewUrlParser: true })
  .then( () => console.log("MongoDB connected"))
  .catch(err => console.log(err))

//set up view engine
app.set('view engine', 'ejs');

//Body parser

app.use(express.urlencoded({
  extended: false
}));
app.use(express.static("public"));

//Express session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}))

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Connect flash
app.use(flash());

//Global Vars
app.use((req,res,next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
})

//routes
app.use("/",require('./routes/index'));
app.use("/users",require('./routes/users'));

var spotifyApi = new SpotifyWebApi({
  clientId: 'af9cfab85d8b42c19fce86876392b57d',
  clientSecret: 'cf52a3a9ad3a4d57812bab7d1786e9e6',
  redirectUri: 'http://www.example.com/callback'
});




var name = "";
var image = "";

//Top 50 Global

var top50GlobalImage = [];
var top50GlobalTrackName = [];
var top50GlobalAudio = [];

//Top 50 India

var top50IndiaImage = [];
var top50IndiaTrackName = [];
var top50IndiaAudio = [];

//All Out 2010s

var allOut2010sImage = [];
var allOut2010sTrackName = [];
var allOut2010sAudio = [];



var obj = "";
var tc = "";
var album = "";


spotifyApi.setAccessToken('BQC-TXdb5nfLg_7biS_cvlHDFwiKDQZXyFx0FqJkxO98v0Ev5i_hfobn4fgJ0muOAV3mj3deVT4HhylITZFJO-173tlWSxVN6xbeZShVApMvfhJofraP-34f7F9P5E58bu0RBHv_Zua2GUe8rEOcQYJ7_P1Vf41d3OvUdVPXy3jfi7E5az6fqqShu7bLpqmICWBEE2VQY-8_D5KdMNc');

spotifyApi.clientCredentialsGrant().then(
    function (data) {
        console.log('The access token expires in ' + data.body.access_token);
        console.log('The access token is ' + data.body.access_token);

        // Save the access token so that it's used in future calls
        spotifyApi.setAccessToken(data.body.access_token);
    },
    function (err) {
        console.log(
            'Something went wrong when retrieving an access token',
            err.message
        );
    }
);

app.get("/",function(req,res){
  res.render("login")
})
app.get("/index",function(req,res){
  res.render("index",{
    h: obj,
    n: name,
    img: image,
  })
})

// spotifyApi.getAlbum('37i9dQZEVXbLiRSasKsNU9')
//   .then(function(data) {
//     console.log('Album information', data.body.tracks);
//   }, function(err) {
//     console.error(err);
//   });
var i;
  spotifyApi.getPlaylist('37i9dQZEVXbMDoHDwVN2tF')
  .then(function(data) {
   var i=0;
   while (top50GlobalTrackName.length!=6) {
     if (data.body.tracks.items[i].track.preview_url != null) {
       top50GlobalTrackName.push(data.body.tracks.items[i].track.name);
       top50GlobalAudio.push(data.body.tracks.items[i].track.preview_url)
       top50GlobalImage.push(data.body.tracks.items[i].track.album.images[1].url)
     }
     i++;
   }
   // console.log(top50GlobalAudio);
   // console.log(top50GlobalTrackName);
   // console.log(top50GlobalImage);
    console.log('Some information about this playlist', data.body.tracks.items[0].track.preview_url);
  }, function(err) {
    console.log('Something went wrong!', err);
  });

  spotifyApi.getPlaylist('37i9dQZEVXbLZ52XmnySJg')
  .then(function(data) {
   var i=0;
   while (top50IndiaTrackName.length!=6) {
     if (data.body.tracks.items[i].track.preview_url != null) {
       top50IndiaTrackName.push(data.body.tracks.items[i].track.name);
       top50IndiaAudio.push(data.body.tracks.items[i].track.preview_url)
       top50IndiaImage.push(data.body.tracks.items[i].track.album.images[1].url)
     }
     i++;
   }
   // console.log(top50IndiaAudio);
   // console.log(top50IndiaTrackName);
   // console.log(top50IndiaImage);
    console.log('Some information about this playlist', data.body.tracks.items[0].track.preview_url);
  }, function(err) {
    console.log('Something went wrong!', err);
  });

  spotifyApi.getPlaylist('37i9dQZF1DXaMu9xyX1HzK')
  .then(function(data) {
   var i=0;
   while (allOut2010sTrackName.length!=6) {
     if (data.body.tracks.items[i].track.preview_url != null) {
       allOut2010sTrackName.push(data.body.tracks.items[i].track.name);
       allOut2010sAudio.push(data.body.tracks.items[i].track.preview_url)
       allOut2010sImage.push(data.body.tracks.items[i].track.album.images[1].url)
     }
     i++;
   }
   console.log(allOut2010sTrackName);
   console.log(allOut2010sImage);
   console.log(allOut2010sAudio);
    console.log('Some information about this playlist', data.body.tracks.items[0].track.preview_url);
  }, function(err) {
    console.log('Something went wrong!', err);
  });


app.post("/search", function(req, res) {
  tc = req.body.track;
  spotifyApi.searchTracks(tc)
    .then(function(data) {

      name = data.body.tracks.items[0].name;
      image = data.body.tracks.items[0].album.images[0].url;
      // console.log(name);
      // console.log(image);
      var trackName = data.body.tracks.items[0].preview_url;
      obj = trackName;
      res.redirect("/index")
      // console.log('Search by "Love"', data.body.tracks.items[0]);
    }, function(err) {
      console.error(err);
    });;
})
// app.post("/home", function(req, res) {
//   spotifyApi.getAlbums(['2zkyMw73XzNXUQaXTb4cio', '4ceWEQarPyTyeb9TUeyLOG',
//       '54NUwj7U1MOhA1ZGbnhiMz', '4neocSMt40stXKK2B8Sy2G',
//       '6cunQQ7YZisYOoiFu2ywIq', '7LF4N7lvyDhrPBuCJ1rplJ',
//       '4hYTERVUXY74XJdm8tyXBV', '13t8iDyl1vkhPcO3Zl29a9'
//     ])
//     .then(function(data) {
//
//       console.log('Albums information', data.body);
//     }, function(err) {
//       console.error(err);
//     });
// })
app.get("/home", function(req, res) {
  res.render("home", {


    top50GlobalImage : top50GlobalImage,
    top50IndiaImage : top50IndiaImage,
    allOut2010sImage: allOut2010sImage,

    top50GlobalTrackName : top50GlobalTrackName,
    top50IndiaTrackName : top50IndiaTrackName,
    allOut2010sTrackName : allOut2010sTrackName,


    top50GlobalAudio : top50GlobalAudio,
    top50IndiaAudio : top50IndiaAudio,
    allOut2010sAudio : allOut2010sAudio
  });
})

app.get('/search/:data', function(req, res) {
  console.log('search word ' + req.params.data);
  spotifyApi.searchTracks(name)
    .then(function(data) {
      var trackName = data.body.tracks.items[0].preview_url;
      res.render("new", {
        he: trackName
      });
    }, function(err) {
      console.error(err);
    });
});


// spotifyApi.getAlbumTracks('4neocSMt40stXKK2B8Sy2G', { limit : 1, offset : 1 })
//
//   .then(function(data) {
//     var trackOne = data.body.items[0].preview_url;
//     // obj.push(trackOne);
//     // console.log(trackOne);
//     console.log(data.body);
//   }, function(err) {
//     console.log('Something went wrong!', err);
//   });
let port = process.env.PORT;
if (port == null || port =="") {
  port = 3000;
}


app.listen(port, function(req, res) {
  console.log("listening at 3000");
});
