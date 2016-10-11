#LIRI

LIRI is a text based version of SIRI with several commands.  It is a command line app that runs in terminal and currently has four unique commands.  It can give you info on a spefic movie, run a spotify search and give info about the first result, show you your last 20 tweets, or run any of the previous commmands by reading them from a text file.

### Installation

Open Terminal
Clone the repo by running 'git clone git@github.com:jmona789/liri-node-app.git'
cd into the repo by running 'cd liri-node-app'
Run 'npm install'

If you want to use the twitter functions you will need to get a twitter api key, create a file in the root directory named 'keys.js' and add the following you it:

exports.twitterKeys = {
  consumer_key: 'Your consumer key',
  consumer_secret: 'Your consumer secret',
  access_token_key: 'Your access token key',
  access_token_secret: 'Your access token secret',
}

##Usage
Anytime you want to use liri simply cd into the directory and run any of the following commands by running 'node liri.js' followed by on the following arguemnts

###tweets
This argument will show you the last 20 tweets you made.

###spotify
By default movie-this will return song information based on the first result of a sporify search for "What's My Age Again?". You can specify any move to search spotify for in the following way: node liri.js movie-this "Your Movie Name Here"

###movie
By default movie-this will return movie information for "Mr. Nobody" from the OMDB. You can specify any move to search OMDB for in the following way: node liri.js movie-this "Your Movie Name Here"

###read-command
This command will read to text file random.txt and if the contents are a valid set of commands then it will run those commands, the text should be formatted like this:
command,"command arugment"
example: spotify,"Who Are You"

##Log
LIRI will also keep a log of all commands that are ran and the results and write them to the log.txt file in the repo.

##Contributing
This is an open source project, feel free to fork it and submit a pull request if you wish to contribute.  

##Author
Jimmy Mona
