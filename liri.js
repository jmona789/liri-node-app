//declaring variables
var fs = require("fs");
var keys = require("./keys.js");
var params = process.argv.slice(2);
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');

//appends the arugments to the log.txt file
fs.appendFile("log.txt", process.argv + "\n", function(err){
})

//grabs twitter api keys from keys.js file
var client = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret
});

//uses a swicth case statement to figure out wihich function to run
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

//runs program
runProgram(params)

//grabs the last 20 tweets of the user from the twitter api and displays and logs them
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
      fs.appendFile("log.txt", i+1 + ". On " + tweets[i].created_at + " You Tweeted: " + tweets[i].text + "\n", function(err){
      })
    }
  });
}

//grabs song info from spotify api and displays and logs them
function spotifyThisSong(){
  if (params[1] === undefined){
    spotify.search({type: "track", query: "What's My Age Again?" }, function(err, data) {
      if ( err ) {
        console.log("Error occurred: " + err);
        return;
      }else{
        spotifyInfo = "Artist: " + data.tracks.items[0].artists[0].name + "\n" + "Song Name: " + data.tracks.items[0].name + "\n" + "Listen on Spotify: " + data.tracks.items[0].artists[0].external_urls.spotify +"\n" + "Album: " + data.tracks.items[0].album.name;
        console.log(spotifyInfo)
        fs.appendFile("log.txt", spotifyInfo, function(err){
        })
      }
    })
  }else{
    spotify.search({type: "track", query: params[1] }, function(err, data) {
      if ( err ) {
        console.log("Error occurred: " + err);
        return;
      }else{
        spotifyInfo = "Artist: " + data.tracks.items[0].artists[0].name + "\n" + "Song Name: " + data.tracks.items[0].name + "\n" + "Listen on Spotify: " + data.tracks.items[0].artists[0].external_urls.spotify +"\n" + "Album: " + data.tracks.items[0].album.name + "\n";
        console.log(spotifyInfo)
        fs.appendFile("log.txt", spotifyInfo, function(err){
        })
      }
    });
  }
}


//grabs movie info from the OMDB api and displays and logs them
function movieThis(){
  if (params[1] === undefined){
    request("http://www.omdbapi.com/?t=Mr+Nobody&y=&plot=short&r=json", function (error, response, body) {
      if (!error && response.statusCode == 200) {
        movieInfo = "Title: " + JSON.parse(body).Title + "\n" + "Year: " + JSON.parse(body).Year + "\n" + "IMDB rating: " + JSON.parse(body).imdbRating + "\n" + "Country: " + JSON.parse(body).Country + "\n" + "Language: " + JSON.parse(body).Language + "\n" + "Plot: " + JSON.parse(body).Plot + "\n"+ "Actors: " + JSON.parse(body).Actors + "\n"
        console.log(movieInfo);
        fs.appendFile("log.txt", movieInfo, function(err){
        })
      }
    })
  }else{
    request("http://www.omdbapi.com/?t=" + params[1] + "&y=&plot=short&r=json", function (error, response, body) {
      if (!error && response.statusCode == 200) {
        movieInfo = "Title: " + JSON.parse(body).Title + "\n" + "Year: " + JSON.parse(body).Year + "\n" + "IMDB rating: " + JSON.parse(body).imdbRating + "\n" + "Country: " + JSON.parse(body).Country + "\n" + "Language: " + JSON.parse(body).Language + "\n" + "Plot: " + JSON.parse(body).Plot + "\n"+ "Actors: " + JSON.parse(body).Actors + "\n"
        console.log(movieInfo);
        fs.appendFile("log.txt", movieInfo, function(err){
        })
      }
    })
  }
}

//passes in text from random.txt as arguments for the runProgram function
function doWhatItSays(){
  fs.readFile("random.txt", "utf8", function(err, data){
    if (err){
      console.log(err);
    }else{
      data = data.split(",");
      var params = data;
      runProgram(params);
    }
  })
}