# liri_node_app

The *LiriBot* is a CLI application that takes user commands and return results based on the commands. 

The available commands are: 

1) **movie-this:** Use this command, followed by the name of a movie, to query the OMDB data-base and search for the movie title. The search will return a few details about the movie. If a match is not found, the results are returned for Mr. Nobody. 

2) **concert-this:** Use this command, followed by the name of a musical act, to query the bandsintown data-base and search for a list of upcoming shows for this act/artist. If no events are found, the *LiriBot* returns a message letting the user know that no upcoming events are scheduled for this act/artist.

3) **spotify-this-song:** Use this command, followed by the name of a song, to query the Spotify data-base and search for a list of songs, including details about artist and album, that match the search query. If no match is found, *LiriBot* will return the results for Ace of Base, The Sign. 

4) **do-what-it-says:** Use this command alone, and the *LiriBot* will find the command in the random.txt file to return the 'random' result. 

**Entering nothing, or a command that is not recognized will bring up the instructions. 

When a user enters a command into the *LiriBot* , this command is logged to a log.txt file. 

This program uses the following NPM packages: 

axios
spotify
fs
moment
