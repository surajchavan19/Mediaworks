# Mediaworks
[Click here to view the website]( https://mediaworks.glitch.me/home )
 
## Introduction
Mediaworks is a music streaming web application built using Node.js, Express.js and Spotify-web-api-node. The Spotify-web-api-node fetches the data: the album photo, the song name, and the preview audio of the song using the API.

## Technologies Used
Node.js, Express, EJS, Passport.js, MongoDB, CSS, JavaScript, Mongoose, bcrypt.

## Setup
1) Download the .zip file or clone the repository on github
2) In the config folder create a file and add your mongodb atlas username password and DB_name as follows
  module.exports = {
  MongoURI: 'mongodb+srv://Username:password@cluster0.ge2ev.mongodb.net/DB_name?retryWrites=true&w=majority'
}
5) Type node app.js / nodemon app.js on the terminal to run the application
6) Open localhost on your browser
