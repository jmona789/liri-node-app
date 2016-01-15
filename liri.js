var fs = require("fs");
var keys = require("./keys.js");
var param = process.argv.slice(2);

switch(param[0]){
  case "my-tweets":
    myTweets();
    break;
  case "spotify-this-song":
    spotifyThisSong();
    break;
  case "movie-this":
    movieThis();
    break;
  case "do-what-it-says":
   doWhatItSays();
   break;
}