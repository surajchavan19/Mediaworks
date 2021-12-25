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






var name = "";
var image = "";

var obj = "";
var tc = "";
var album = "";
var firstAlbumImage = "";
var secondAlbumImage = "";
var thirdAlbumImage = "";
var fourthAlbumImage = "";
var fifthAlbumImage = "";
var sixthAlbumImage = "";
var seventhAlbumImage = "";
var eightAlbumImage = "";
var ninethAlbumImage = "";
var tenthAlbumImage = "";
var eleventhAlbumImage = "";
var twelvethAlbumImage = "";
var thirteenAlbumImage = "";
var fourteenAlbumImage = "";
var fifteenAlbumImage = "";
var sixteenAlbumImage = "";
var seventeenAlbumImage = "";
var eighteenAlbumImage = "";

var firstAlbumName = "";
var secondAlbumName = "";
var thirdAlbumName = "";
var fourthAlbumName = "";
var fifthAlbumName = "";
var sixthAlbumName = "";
var seventhAlbumName = "";
var eightAlbumName = "";
var ninethAlbumName = "";
var tenthAlbumName = "";
var eleventhAlbumName = "";
var twelvethAlbumName = "";
var thirteenAlbumName = "";
var fourteenAlbumName = "";
var fifteenAlbumName = "";
var sixteenAlbumName = "";
var seventeenAlbumName = "";
var eighteenAlbumName = "";

var trackOne = "";
var trackTwo = "";
var trackThree = "";
var trackFour = "";
var trackFive = "";
var trackSix = "";
var trackSeven = "";
var trackEight = "";
var trackNine = "";
var trackTen = "";
var trackEleven = "";
var trackTwelve = "";
var trackThirteen = "";
var trackFourteen = "";
var trackFifteen = "";
var trackSixteen = "";
var trackSeventeen = "";
var trackEighteen = "";



var spotifyApi = new SpotifyWebApi({
  clientId: 'af9cfab85d8b42c19fce86876392b57d',
  clientSecret: 'cf52a3a9ad3a4d57812bab7d1786e9e6',
  redirectUri: 'http://www.example.com/callback'
});
// spotifyApi.setAccessToken('BQDcMAQegfc_Qy1PYo6g-yBUP0-pd2v_307FAHm9vaoARFTsil4wsqWiVPXQ4Uhg5vJtVC4LTgMICHQFPDhsnILhd8g5A1p8Q4TjwbGUmxgWL77DdU0IdupLFDuYrHhID3rNgYkX4exZC14BzG1z99mwp_11MzmZmIGlMaJl5CiabiupSaA');

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

app.post("/search", function(req, res) {
  tc = req.body.track;
  spotifyApi.searchTracks(tc)
    .then(function(data) {
      name = data.body.tracks.items[0].name;
      image = data.body.tracks.items[0].album.images[0].url;
      console.log(name);
      console.log(image);
      var trackName = data.body.tracks.items[0].preview_url;
      obj = trackName;
      res.redirect("/index")
      console.log('Search by "Love"', data.body.tracks.items[0]);
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


    firstAlbumImage: firstAlbumImage,
    secondAlbumImage: secondAlbumImage,
    thirdAlbumImage: thirdAlbumImage,
    fourthAlbumImage: fourthAlbumImage,
    fifthAlbumImage: fifthAlbumImage,
    sixthAlbumImage: sixthAlbumImage,
    seventhAlbumImage : seventhAlbumImage,
    eightAlbumImage : eightAlbumImage,
    ninethAlbumImage : ninethAlbumImage,
    tenthAlbumImage : tenthAlbumImage,
    eleventhAlbumImage : eleventhAlbumImage,
    twelvethAlbumImage : twelvethAlbumImage,
    thirteenAlbumImage: thirteenAlbumImage,
    fourteenAlbumImage : fourteenAlbumImage,
    fifteenAlbumImage : fifteenAlbumImage,
    sixteenAlbumImage : sixteenAlbumImage,
    seventeenAlbumImage :seventeenAlbumImage,
    eighteenAlbumImage : eighteenAlbumImage,

    firstAlbumName: firstAlbumName,
    secondAlbumName: secondAlbumName,
    thirdAlbumName: thirdAlbumName,
    fourthAlbumName: fourthAlbumName,
    fifthAlbumName: fifthAlbumName,
    sixthAlbumName: sixthAlbumName,
    seventhAlbumName: seventhAlbumName,
    eightAlbumName : eightAlbumName,
    ninethAlbumName : ninethAlbumName,
    tenthAlbumName : tenthAlbumName,
    eleventhAlbumName : eleventhAlbumName,
    twelvethAlbumName : twelvethAlbumName,
    thirteenAlbumName: thirteenAlbumName,
    fourteenAlbumName : fourteenAlbumName,
    fifteenAlbumName : fifteenAlbumName,
    sixteenAlbumName : sixteenAlbumName,
    seventeenAlbumName :seventeenAlbumName,
    eighteenAlbumName : eighteenAlbumName,


    audioOne: trackOne,
    audioTwo: trackTwo,
    audioThree: trackThree,
    audioFour: trackFour,
    audioFive: trackFive,
    audioSix: trackSix,
    audioSeven: trackSeven,
    audioEight: trackEight,
    audioNine: trackNine,
    audioTen: trackTen,
    audioEleven: trackEleven,
    audioTwelve: trackTwelve,
    audioThirteen: trackThirteen,
    audioFourteen: trackFourteen,
    audioFifteen: trackFifteen,
    audioSixteen: trackSixteen,
    audioSeventeen: trackSeventeen,
    audioEighteen: trackEighteen,





  });
  spotifyApi.getAlbums(['5HaIikztvnTIwx2QA5YsmX', '2ifXB65SLpF97vWZjKGpQ9',
      '0DUOcMjmHGVLqFkWqfNC0z', '4QLAtpLNUsHEYrcHXmMIZZ',
      '0CuAXOxHwlGy4l8cyUD3bs', '5BLwx5IlfoWOrjJJ3i7gbK','13t8iDyl1vkhPcO3Zl29a9',
      '4hYTERVUXY74XJdm8tyXBV','43Fh1hMumKDCcax2JOWEmR',
      '41fVKrZfbiGAlURWdeWMKA','4gCNyS7pidfK3rKWhB3JOY','1uyf3l2d4XYwiEqAb7t7fX',
      '3T4tUhGYeRNVUGevb0wThu','2CUXo26JAWIbQx0EVMnjpA','5RM8pIBX8zU9g8U5WG4zfZ','4OTAx9un4e6NfoHuVRiOrC',
      '3I8PdIhk6pNm8Kv0HiF14V','1Q9pYTcpVfz0eJTZZczELy'

    ])
    .then(function(data) {
      firstAlbumImage = data.body.albums[0].images[1].url;
      secondAlbumImage = data.body.albums[1].images[1].url;
      thirdAlbumImage = data.body.albums[2].images[1].url;
      fourthAlbumImage = data.body.albums[3].images[1].url;
      fifthAlbumImage = data.body.albums[4].images[1].url;
      sixthAlbumImage = data.body.albums[5].images[1].url;
      seventhAlbumImage = data.body.albums[6].images[1].url;
      eightAlbumImage = data.body.albums[7].images[1].url;
      ninethAlbumImage = data.body.albums[8].images[1].url;
      tenthAlbumImage = data.body.albums[9].images[1].url;
      eleventhAlbumImage = data.body.albums[10].images[1].url;
      twelvethAlbumImage = data.body.albums[11].images[1].url;
      thirteenAlbumImage = data.body.albums[12].images[1].url;
      fourteenAlbumImage = data.body.albums[13].images[1].url;
      fifteenAlbumImage = data.body.albums[14].images[1].url;
      sixteenAlbumImage = data.body.albums[15].images[1].url;
      seventeenAlbumImage = data.body.albums[16].images[1].url;
      eighteenAlbumImage = data.body.albums[17].images[1].url;


      firstAlbumName = data.body.albums[0].name;
      secondAlbumName = data.body.albums[1].name;
      thirdAlbumName = data.body.albums[2].name;
      fourthAlbumName = data.body.albums[3].name;
      fifthAlbumName = data.body.albums[4].name;
      sixthAlbumName = data.body.albums[5].name;
      seventhAlbumName = data.body.albums[6].name;
      eightAlbumName = data.body.albums[7].name;
      ninethAlbumName = data.body.albums[8].name;
      tenthAlbumName = data.body.albums[9].name;
      eleventhAlbumName = data.body.albums[10].name;
      twelvethAlbumName = data.body.albums[11].name;


      spotifyApi.getArtistTopTracks('6M2wZ9GZgrQXHCFfjv46we', 'GB')

        .then(function(data) {
          trackOne = data.body.tracks[1].preview_url;


        }, function(err) {
          console.log('Something went wrong!', err);
        });
      spotifyApi.getAlbumTracks('2ifXB65SLpF97vWZjKGpQ9', {
          limit: 10,
          offset: 0
        })
        .then(function(data) {
          trackTwo = data.body.items[0].preview_url;

        }, function(err) {
          console.log('Something went wrong!', err);
        });
      spotifyApi.getAlbumTracks('0DUOcMjmHGVLqFkWqfNC0z', {
          limit: 8,
          offset: 0
        })
        .then(function(data) {
          trackThree = data.body.items[0].preview_url;

        }, function(err) {
          console.log('Something went wrong!', err);
        });
      spotifyApi.getArtistTopTracks('1uNFoZAHBGtllmzznpCI3s','GB')
        //   limit: 5,
        //   offset: 0
        // })
        .then(function(data) {
          trackFour = data.body.tracks[0].preview_url;

        }, function(err) {
          console.log('Something went wrong!', err);
        });
      spotifyApi.getArtistTopTracks('6hyCmqlpgEhkMKKr65sFgI','GB' )

        .then(function(data) {
          trackFive = data.body.tracks[0].preview_url;

        }, function(err) {
          console.log('Something went wrong!', err);
        });
      spotifyApi.getArtistTopTracks('1tqysapcCh1lWEAc9dIFpa','GB')

        .then(function(data) {
          trackSix = data.body.tracks[0].preview_url;

        }, function(err) {
          console.error(err);
        });
      spotifyApi.getAlbumTracks('13t8iDyl1vkhPcO3Zl29a9', {
          limit: 11,
          offset: 0
        })
        .then(function(data) {
          trackSeven = data.body.items[10].preview_url;

        }, function(err) {
          console.error(err);
        });
      spotifyApi.getAlbumTracks('4hYTERVUXY74XJdm8tyXBV', {
          limit: 5,
          offset: 1
        })
        .then(function(data) {
          trackEight = data.body.items[0].preview_url;

        }, function(err) {
          console.error(err);
        });
        spotifyApi.getAlbumTracks('43Fh1hMumKDCcax2JOWEmR', {
            limit: 8,
            offset: 0
          })
        .then(function(data) {
          trackNine = data.body.items[0].preview_url;

        }, function(err) {
          console.error(err);
        });
      spotifyApi.getArtistTopTracks('0cwmNvclzPd8mQnoHuIksj','GB' )

        .then(function(data) {
          trackTen = data.body.tracks[6].preview_url;

        }, function(err) {
          console.error(err);
        });
      spotifyApi.getArtistTopTracks('4AK6F7OLvEQ5QYCBNiQWHq', 'GB')

        .then(function(data) {
          trackEleven = data.body.tracks[0].preview_url;

        }, function(err) {
          console.error(err);
        });
      spotifyApi.getAlbumTracks('1uyf3l2d4XYwiEqAb7t7fX', {
          limit: 7,
          offset: 0
        })
        .then(function(data) {
          trackTwelve = data.body.items[6].preview_url;

        }, function(err) {
          console.error(err);
        });
        spotifyApi.getArtistTopTracks('6eUKZXaKkcviH0Ku9w2n3V', 'GB')
          .then(function(data) {
            trackThirteen = data.body.tracks[3].preview_url;
            console.log(trackThirteen)

          }, function(err) {
            console.error(err);
          });
          spotifyApi.getAlbumTracks('2CUXo26JAWIbQx0EVMnjpA', {
              limit: 7,
              offset: 0
            })
            .then(function(data) {
              trackFourteen = data.body.items[2].preview_url;

            }, function(err) {
              console.error(err);
            });
            spotifyApi.getAlbumTracks('5RM8pIBX8zU9g8U5WG4zfZ',{
              limit: 7,
              offset: 0
            })

              .then(function(data) {
                trackFifteen = data.body.items[1].preview_url;
               console.log(trackFifteen);

              }, function(err) {
                console.error(err);
              });
              spotifyApi.getAlbumTracks('4OTAx9un4e6NfoHuVRiOrC', {
                  limit: 7,
                  offset: 0
                })
                .then(function(data) {
                  trackSixteen = data.body.items[5].preview_url;

                }, function(err) {
                  console.error(err);
                });
                spotifyApi.getAlbumTracks('3uuu6u13U0KeVQsZ3CZKK4', {
                    limit: 7,
                    offset: 0
                  })
                  .then(function(data) {
                    trackSeventeen = data.body.items[2].preview_url;

                  }, function(err) {
                    console.error(err);
                  });
                  spotifyApi.getAlbumTracks('1Q9pYTcpVfz0eJTZZczELy', {
                      limit: 7,
                      offset: 0
                    })
                    .then(function(data) {
                      trackEighteen = data.body.items[2].preview_url;
                      console.log(trackEighteen)

                    }, function(err) {
                      console.error(err);
                    });



    }, function(err) {
      console.log('Something went wrong!', err);
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
