var axios = require("axios");
var Spotify = require("node-spotify-api");
var moment = require("moment");
var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var command = process.argv[2];
var search = process.argv.slice(3).join("-");

function concert(artist) {
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function (resp) {
            var concerts = resp.data;
            for (var i = 0; i < concerts.length; i++) {
                // console.log(concerts[i].venue);
                var nius = "";
                if (concerts[i].venue.country !== "United States") {
                    nius = "\n(Not in USA)";
                }
                    var dateTime = concerts[i].datetime.split("T");
                    var date = moment(dateTime[0], "YYYY-MM-DD").format("MM/DD/YYYY");
                    var time = moment(dateTime[1], "HH:mm:ss").format("LT");
                    console.log("Venue: " + concerts[i].venue.name);
                    console.log("City: " + concerts[i].venue.city + ", " + resp.data[i].venue.region+nius);
                    // console.log(nius);
                    console.log("Date: " + date + ", @ " + time);
                    console.log("============================\n");
            }
        })
};

function spotSong(song){
    var limit = 10;
    if (song === ""){
        song = "The Sign, Ace of base";
        limit = 1
    }
    spotify.search({ 
        type:'track', 
        query:song, 
        limit:limit
    })
    .then(function(resp) {
        var spot = resp.tracks.items;
        for (var i=0;i<spot.length;i++){
        console.log("Artist: "+spot[i].album.artists[0].name);
          console.log("Song: "+spot[i].name);
          console.log("Album: "+spot[i].album.name);
          console.log("Preview: "+spot[i].preview_url,"\n====================================\n");
      }
    })
}

function movie(title){
    if (title === "") {
        var title1 = "Mr. Nobody";
    } else {
        var title1 = title;
    }
    var queryURL = "https://www.omdbapi.com/?t=" + title1 + "&y=&plot=short&apikey=trilogy";
    axios.get(queryURL).then(function(response){
        var movie = response.data
        // console.log(response.data);
       console.log("Title: "+movie.Title);
        console.log("Released in: "+movie.Year);
        console.log("IMDB Rating: "+movie.imdbRating);
        if (movie.Ratings[1] === undefined) {
            var rating = "Not available";
        } else {
            var rating = movie.Ratings[1].Value;
        }
        console.log("RT Rating: "+rating);
        console.log("Country: "+movie.Country);
        console.log("Language(s): "+movie.Language);
        console.log("Plot: "+movie.Plot);
        console.log("Cast members: "+movie.Actors);
        console.log("============================\n");

    });

}

if (command === "concert-this") {
    // console.log("Concert" + search);
    concert(search);
} else if (command === "spotify-this-song") {
    spotSong(search);
    // console.log("Song " + search);
} else if (command === "movie-this") {
    movie(search);
    console.log("Movie " + search);
} else if (command === "do-what-it-says") {
    justDoIt(search);
    console.log("Anything " + search);
} else {
    console.log(Error);
}


