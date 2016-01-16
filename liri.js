var fs = require("fs");
var keys = require("./keys.js");
var params = process.argv.slice(2);
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');

var client = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret
});

function runProgram(params){
  switch(params[0]){
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
    case undefined:
      console.log("Please enter a command.");
      break;
    default:
      console.log("That is not a valid command.");
      break;
  }
}

runProgram(params)

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
  if (params[1] === undefined){
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
    spotify.search({type: "track", query: params[1] }, function(err, data) {
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

function movieThis(){
  if (params[1] === undefined){
    request("http://www.omdbapi.com/?t=Mr+Nobody&y=&plot=short&r=json", function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Year: " + JSON.parse(body).Year);
        console.log("IMDB rating: " + JSON.parse(body).imdbRating);
        console.log("Country: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
      }
    })
  }else{
    request("http://www.omdbapi.com/?t=" + params[1] + "&y=&plot=short&r=json", function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(JSON.parse(body).Title);
        console.log("Year: " + JSON.parse(body).Year);
        console.log("IMDB rating: " + JSON.parse(body).imdbRating);
        console.log("Country: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
      }
    })
  }
}

function doWhatItSays(){
  fs.readFile("random.txt", "utf8", function(err, data){
    if (err){
      console.log(err);
    }else{
      data = data.split(",");
      var params = data
      runProgram(params);
    }
  })
}