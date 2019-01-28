require("dotenv").config();

//keys and npm packages
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

//spotify details
var spotify = new Spotify(keys.spotify);

//user inputs after node liri command
var userInput1 = process.argv[2];
var userInput2 = "";

//concatination of the second user input so that it is usable in api calls and URLS
for (var i = 3; i < process.argv.length; i++) {

    if(i > 3 && i < process.argv.length) {

    userInput2 = userInput2 + '+' + process.argv[i];

    } else {

        userInput2 += process.argv[i];
    }
}

function getConcert() {

    //gives the artistName variable the value of the second user input
    var artistName = userInput2
    var bandsqueryUrl = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp";

    // // debug the actual URL
    // console.log(bandsqueryUrl);

    //axios get call to query bands in town API
    axios.get(bandsqueryUrl).then(function(response) {

        //saving response data to variable
        var bandData = response.data;

        //variable to remove concatination from entry so that it can be reprinted for the user
        var artistName2 = artistName.replace(/\+/g, " ");

        //if results are returned 
        if (bandData.length > 0) {

            // var artistName2 = artistName.replace(/\+/g, " ");

            console.log("\nHere is a list of upcoming shows for: " + artistName2 + "\n")

            //loop over all results to add the details 
            for(var i = 0; i < bandData.length; i++) {
                
                console.log("--------------------------------------------")
                console.log("Venue: " + bandData[i].venue.name);
                console.log("Location: " + bandData[i].venue.country + ", " + bandData[i].venue.city);
                console.log("Date: " + moment(bandData[i].venue.datetime).format('MM/DD/YYYY'))

            }
        } else {
            //error handling
            console.log("\nOops, looks like there are no upcoming shows for " + artistName2 + "\n")
        }

    });

}

function getSpotify() {

    var songName =  userInput2

    //variable to remove concatination from entry so that it can be reprinted for the user
    var songName2 = songName.replace(/\+/g, " ");

    //console.log(songName)

    // if(songName !== "") {
        spotify.search({ type: 'track', query: songName, limit: 5 }, function(err, data) {
            if (err) {
            return console.log('Error occurred: ' + err);
            } else {
                if(data.tracks.items.length > 0) {
                
                    console.log("\nSearching for... " + songName2 + "\n" )
                    for(var i = 0; i < 5; i++) {
                        console.log("--------------------------------------------")
                        console.log("Artist: " + data.tracks.items[i].artists[0].name);
                        console.log("Track title: " + data.tracks.items[i].name);
                        console.log("Spotify Link: " + data.tracks.items[i].external_urls.spotify);
                        console.log("Album: " + data.tracks.items[i].album.name)
                    }
                } else {
                
                    console.log("\nOops, it looks like you didn't search for a song. Here is one you might like...\n")
                    console.log("Artist: Ace of Base");
                    console.log("Track title: The Sign");
                    console.log("Spotify Link: https://open.spotify.com/track/0hrBpAOgrt8RXigk83LLNE");
                    console.log("Album: The Sign")
                
                }
            }
        
        });
    }


function getMovie() {

    var movieName = userInput2
    var moviequeryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    //debug the actual URL
    //console.log(moviequeryUrl);

    // if(response.data.length > 0) {
        axios.get(moviequeryUrl).then(
        function(response) {
        
            if(response.data.Response === "True"){

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
});
}


function doWhat() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        
        if (error) {
            return console.log(error);
        } else {
            
            var data2 =  data.split(",")
        

            userInput1 = data2[0]
            userInput2 = data2[1]

            liriBot();
        }
        
    })

}


function displayInstructions() {

    console.log("Welcome to the Liri Bot! \n------------------\nTo search for a movie, type movie-this, followed by the movie title. \n------------------\nTo search for concerts type concert-this, followed by the artist name. \n------------------ \nTo search for an artist or song, type spotify-this-song, followed by the artist or song title")

}

function liriBot () {
    var log = userInput1 + ", " +  userInput2 
    fs.appendFile("log.txt", log + "\n" , function (err){
        if (err) {
            return console.log(err);
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

        
    });
}

liriBot();
