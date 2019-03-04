var axios = require("axios");
var spotify = require("node-spotify-api");
var moment = require("moment");
var dotenv = require("dotenv");
var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);
var fs=require("fs");
var command = process.argv[2];
var search = process.argv.slice(3).join("-");

function concert(artist){
    axios.get("https://rest.bandsintown.com/artists/" + artist +  "/events?app_id=codingbootcamp")
    .then(function(resp){
       var concerts = resp.data;
        for (var i=0; i<concerts.length;i++){
            if (resp.data[i].venue.country === "United States") {
            var dateTime=resp.data[i].datetime.split("T");
            var date=moment(dateTime[0],"YYYY-MM-DD").format("MM/DD/YYYY");
            var time=moment(dateTime[1],"HH:mm:ss").format("LT");
            console.log("Venue: "+resp.data[i].venue.name);
            console.log("City: "+resp.data[i].venue.city+", "+resp.data[i].venue.region);
            console.log("Date: "+date+", @ "+time,"\n============================");
            // console.log(" ");
            
        } 
    }
    })
};


if (command === "concert-this") {
    console.log("Concert"+search);
    concert(search);
} else if (command === "spotify-this-song") {
    spotify(search);
    console.log("Song "+search);
} else if (command === "movie-this") {
    movie(search);
    console.log("Movie "+search);
} else if (command === "do-what-it-says") {
    justDoIt(search);
    console.log("Anything "+search);
} else {
    console.log(Error);
}


