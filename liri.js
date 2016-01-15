var fs = require("fs");
var keys = require("./keys.js");
var param = process.argv.slice(2);
var Twitter = require('twitter');
var spotify = require('spotify');

var client = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret
});

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

function myTweets(){
  client.get('statuses/user_timeline', function(error, tweets, response){
    console.log(error);
    if(error) {
      console.log(error);
      throw error;
    }
    console.log("Your last 20 tweets:")
    for (i = 0; i < 20; i++){
      console.log(i+1 + ". On " + tweets[i].created_at + " You Tweeted: " + tweets[i].text);
    }
  });
}

function spotifyThisSong(){
  if (param[1] === undefined){
    spotify.search({type: "track", query: "What's My Age Again?" }, function(err, data) {
      if ( err ) {
          console.log("Error occurred: " + err);
          return;
      }else{
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Song Name: " + data.tracks.items[0].name);
        console.log("Listen on Spotify: " + data.tracks.items[0].artists[0].external_urls.spotify);
        console.log("Album: " + data.tracks.items[0].album.name);
      }
    })
  }else{
    spotify.search({type: "track", query: param[1] }, function(err, data) {
      if ( err ) {
          console.log("Error occurred: " + err);
          return;
      }else{
        console.log("Artist: " + data.tracks.items[0].artists[0].name)
        console.log("Song Name: " + data.tracks.items[0].name);
        console.log("Listen on Spotify: " + data.tracks.items[0].artists[0].external_urls.spotify);
        console.log("Album: " + data.tracks.items[0].album.name);
      }
    });
  }
}