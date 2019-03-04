var axios = require("axios");
var spotify = require("node-spotify-api");
var moment = require("moment");
var dotenv = require("dotenv");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var fs=require("fs");
var command = process.argv[2];
var search = process.argv(3)

if (command === "concert-this") {
    var findConcert;
    console.log("Concert");
} else if (command === "spotify-this-song") {
    var spotify;
    console.log("Song");
} else if (command === "movie-this") {
    var movie;
    console.log("Movie");
} else if (command === "do-what-it-says") {
    var doit;
    console.log("Anything");
}


