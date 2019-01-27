// require("dotenv").config();
// var keys = require("./keys.js");
var axios = require("axios");
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

// `node liri.js concert-this <artist/band name here>`

//    * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:

//      * Name of the venue

//      * Venue location

//      * Date of the Event (use moment to format this as "MM/DD/YYYY")

// `node liri.js spotify-this-song '<song name here>'`

//    * This will show the following information about the song in your terminal/bash window

//      * Artist(s)

//      * The song's name

//      * A preview link of the song from Spotify

//      * The album that the song is from

//    * If no song is provided then your program will default to "The Sign" by Ace of Base.

// `node liri.js movie-this '<movie name here>'`

//    * This will output the following information to your terminal/bash window:
var movieName = userInput2

function getMovie() {

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    axios.get(queryUrl).then(
    function(response) {

        console.log("--------------------------------------------")
        console.log("This movie's title is: " + response.data.Title);
        console.log("The release year of this movie is: " + response.data.Year);
        console.log("This movie's IMDB rating is: " + response.data.imdbRating);
        console.log("This movie's Rotten Tomatoes rating is: " + response.data.Ratings[1].Value);
        console.log("This movie was made in: " + response.data.Country);
        console.log("This movie's language is: " + response.data.Language);
        console.log("This movie's plot is: " + response.data.Plot);
        console.log("This movie stars: " + response.data.Actors);
        console.log("--------------------------------------------");
    }
    );
}


//    * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

// `node liri.js do-what-it-says`

//    * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

//      * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

//      * Edit the text in random.txt to test out the feature for movie-this and concert-this.

switch (userInput1) {

    case "movie-this":
        getMovie();
        break;

    case "spotify-this-song":
        getSpotify();
        break;

    case "movie-this":
        getMovie();
        break;

    case "do-what-it-says":
        doWhat();
        break;
}
