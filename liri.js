// require("dotenv").config();
// var keys = require("./keys.js");
var axios = require("axios");
// var request = require("request");
var moment = require("moment");
// var spotify = new Spotify(keys.spotify);

var userInput1 = process.argv[2];
var userInput2 = "";

for (var i = 3; i < process.argv.length; i++) {

    if(i > 3 && i < process.argv.length) {

    userInput2 = userInput2 + '+' + process.argv[i];

    } else {

        userInput2 += process.argv[i];
    }
}

function getConcert() {

    var artistName = userInput2
    var bandsqueryUrl = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp";

    // debug the actual URL
    console.log(bandsqueryUrl);

    axios.get(bandsqueryUrl).then(function(response) {

        

        var bandData = response.data;
        var artistName2 = artistName.replace(/\+/g, " ");

        if (bandData.length > 0) {

            // var artistName2 = artistName.replace(/\+/g, " ");

            console.log("\nHere is a list of upcoming shows for: " + artistName2 + "\n")

            for(var i = 0; i < 5; i++) {
                
                console.log("--------------------------------------------")
                console.log("Venue: " + bandData[i].venue.name);
                console.log("Location: " + bandData[i].venue.country + ", " + bandData[i].venue.city);
                console.log("Date: " + moment(bandData[i].venue.datetime).format('MM/DD/YYYY'))

            }
        } else {
            console.log("\nOops, looks like there are no upcoming shows for " + artistName2 + "\n")
        }

    });

}


// `node liri.js spotify-this-song '<song name here>'`

//    * This will show the following information about the song in your terminal/bash window

//      * Artist(s)

//      * The song's name

//      * A preview link of the song from Spotify

//      * The album that the song is from

//    * If no song is provided then your program will default to "The Sign" by Ace of Base.



function getMovie() {

    var movieName = userInput2
    var moviequeryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    // debug the actual URL
    console.log(moviequeryUrl);

    if(movieName !== "") {
        axios.get(moviequeryUrl).then(
        function(response) {

                console.log("\n--------------------------------------------")
                console.log("You searched for: " + response.data.Title);
                console.log("Release year: " + response.data.Year);
                console.log("IMDB rating: " + response.data.imdbRating);
                console.log("Rotten Tomatoes rating: " + response.data.Ratings[1].Value);
                console.log("Country: " + response.data.Country);
                console.log("Language(s): " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Starring: " + response.data.Actors);
                console.log("--------------------------------------------");
        });
    } else {
        axios.get("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy").then(
            function(response) {

                console.log("\nOops, it looks like you didn't pick a movie. Here's a movie you might like...")
                console.log("\n--------------------------------------------")
                console.log("Tite: " + response.data.Title);
                console.log("Release year: " + response.data.Year);
                console.log("IMDB rating: " + response.data.imdbRating);
                console.log("Rotten Tomatoes rating: " + response.data.Ratings[1].Value);
                console.log("Country: " + response.data.Country);
                console.log("Language(s): " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Starring: " + response.data.Actors);
                console.log("--------------------------------------------");

            }
        )
    }
}


//    * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

// `node liri.js do-what-it-says`

//    * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

//      * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

//      * Edit the text in random.txt to test out the feature for movie-this and concert-this.

function displayInstructions() {

    console.log("Welcome to the Liri Bot! \n------------------\nTo search for a movie, type movie-this, followed by the movie title. \n------------------\nTo search for concerts type concert-this, followed by the artist name. \n------------------ \nTo search for an artist or song, type spotify-this-song, followed by the artist or song title")

}

switch (userInput1) {

    case "movie-this":
        getMovie();
        break;

    case "spotify-this-song":
        getSpotify();
        break;

    case "concert-this":
        getConcert();
        break;

    case "do-what-it-says":
        doWhat();
        break;
    default: 
        displayInstructions();
        break;
}
