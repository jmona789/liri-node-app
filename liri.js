//declaring variables
var fs = require("fs");
var keys = require("./keys.js");
var params = process.argv.slice(2);
var command = params[0];
var commandArg = params[1];
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
function runProgram(command, commandArg){
  switch(command){
    case "tweets":
      myTweets();
      break;
    case "spotify":
      spotifyFunc(commandArg);
      break;
    case "movie":
      movieThis(commandArg);
      break;
    case "read-command":
      doWhatItSays(commandArg);
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
runProgram(command, commandArg);

//grabs the last 20 tweets of the user from the twitter api and displays and logs them
function myTweets(){
  client.get('statuses/user_timeline', function(error, tweets, response){
    if(error) {
      console.log(error);
      throw error;
    }
    var tweetArray =["Your last 20 tweets:"];
    for (i = 0; i < 20; i++){
      tweetArray.push(i+1 + ". On " + tweets[i].created_at + " You Tweeted: " + tweets[i].text);
      //fs.appendFile("log.txt", i+1 + ". On " + tweets[i].created_at + " You Tweeted: " + tweets[i].text + "\n", function(err){
    }
    tweetArray.forEach(function(element, index, array) {
      console.log(tweetArray[index]);
      log(tweetArray[index] +"\n")
    });
  });
}

//grabs song info from spotify api and displays and logs them
function spotifyFunc(commandArg){
  if (commandArg === undefined){
    commandArg = "What's My Age Again?";
  }
  spotify.search({type: "track", query: commandArg }, function(err, data) {
    if ( err ) {
      console.log("Error occurred: " + err);
      return;
    }else{
      spotifyInfo = "Artist: " + data.tracks.items[0].artists[0].name + "\n" + "Song Name: " + data.tracks.items[0].name + "\n" + "Listen on Spotify: " + data.tracks.items[0].artists[0].external_urls.spotify +"\n" + "Album: " + data.tracks.items[0].album.name + "\n";
      console.log(spotifyInfo);
      log(spotifyInfo);
    }
  });
}


//grabs movie info from the OMDB api and displays and logs them
function movieThis(commandArg){
  if (commandArg === undefined){
    request("http://www.omdbapi.com/?t=Mr+Nobody&y=&plot=short&r=json&tomatoes=true", function (error, response, body) {
      if (!error && response.statusCode == 200) {
        movieInfo = "Title: " + JSON.parse(body).Title + "\n" + "Year: " + JSON.parse(body).Year + "\n" + "IMDB rating: " + JSON.parse(body).imdbRating + "\n" + "Country: " + JSON.parse(body).Country + "\n" + "Language: " + JSON.parse(body).Language + "\n" + "Plot: " + JSON.parse(body).Plot + "\n"+ "Actors: " + JSON.parse(body).Actors + "\n" + "Rotten Tomatoes Rating:" + JSON.parse(body).tomatoRating + "\n" + "Rotten Tomatoes URL:" + JSON.parse(body).tomatoURL +"\n";
        console.log(movieInfo);
        log(movieInfo);
      }
    })
  }else{
    request("http://www.omdbapi.com/?t=" + commandArg + "&y=&plot=short&r=json&tomatoes=true", function (error, response, body) {
      if (!error && response.statusCode == 200) {
        movieInfo = "Title: " + JSON.parse(body).Title + "\n" + "Year: " + JSON.parse(body).Year + "\n" + "IMDB rating: " + JSON.parse(body).imdbRating + "\n" + "Country: " + JSON.parse(body).Country + "\n" + "Language: " + JSON.parse(body).Language + "\n" + "Plot: " + JSON.parse(body).Plot + "\n"+ "Actors: " + JSON.parse(body).Actors + "\n" + "Rotten Tomatoes Rating:" + JSON.parse(body).tomatoRating + "\n" + "Rotten Tomatoes URL:" + JSON.parse(body).tomatoURL +"\n";
        console.log(movieInfo);
        log(movieInfo);
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
      runProgram(data[0], data[1]);
    }
  })
}

function log(info){
  fs.appendFile("log.txt", info + "\n", function(err){
  });
}