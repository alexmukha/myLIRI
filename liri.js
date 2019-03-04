var axios = require("axios");
var Spotify = require("node-spotify-api");
var moment = require("moment");
var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var command = process.argv[2];
var search = process.argv.slice(3).join(" ");

function concert(artist) {
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function (resp) {
            var concerts = resp.data;
            var cBreak = "######## CONCERT INFO #########";
            recordLog(cBreak + "\n");
            for (var i = 0; i < concerts.length; i++) {
                // console.log(concerts[i].venue);
                var nius = "";
                if (concerts[i].venue.country !== "United States") {
                    nius = "\n(Not in USA)";
                }
                var dateTime = concerts[i].datetime.split("T");
                var date = moment(dateTime[0], "YYYY-MM-DD").format("MM/DD/YYYY");
                var time = moment(dateTime[1], "HH:mm:ss").format("LT");
                var vData = ("Venue: " + concerts[i].venue.name);
                var cData = ("City: " + concerts[i].venue.city + ", " + resp.data[i].venue.region + nius);
                var dData = ("Date: " + date + ", @ " + time);
                var allConcertData = (vData + "\n" + cData + "\n" + dData + "\n============================");
                console.log(allConcertData);
                recordLog(allConcertData + "\n");
                // console.log(vData);
                // console.log(cData);
                // console.log(dData);
                // console.log("============================\n");
            }
            recordLog(cBreak + "\n");
        });
};

function spotSong(song) {
    var limit = 10;
    if (song === "") {
        song = "The Sign, Ace of base";
        limit = 1
    }
    spotify.search({
        type: 'track',
        query: song,
        limit: limit
    })
        .then(function (resp) {
            var spot = resp.tracks.items;
            var sBreak = "######## SONGS INFO #########";
            recordLog(sBreak + "\n");
            for (var i = 0; i < spot.length; i++) {
                var Artist = ("Artist: " + spot[i].album.artists[0].name);
                var Song = ("Song: " + spot[i].name);
                var Album = ("Album: " + spot[i].album.name);
                var Preview = ("Preview: " + spot[i].preview_url);
                var spotifyArray = (Artist + "\n" + Song + "\n" + Album + "\n" + Preview + "\n====================================");
                console.log(spotifyArray);
                recordLog(spotifyArray + "\n");

                // console.log("Artist: "+spot[i].album.artists[0].name);
                // console.log("Song: "+spot[i].name);
                // console.log("Album: "+spot[i].album.name);
                // console.log("Preview: "+spot[i].preview_url);
                // console.log("====================================\n");
            }
            recordLog(sBreak + "\n");
        })
}

function movie(title) {
    if (title === "") {
        var title1 = "Mr. Nobody";
    } else {
        var title1 = title;
    }
    var queryURL = "https://www.omdbapi.com/?t=" + title1 + "&y=&plot=short&apikey=trilogy";
    axios.get(queryURL).then(function (response) {
        var movie = response.data
        var mBreak = "######## MOVIE INFO #########";
        if (movie.Ratings[1] === undefined) {
            var rating = "Not available";
        } else {
            var rating = movie.Ratings[1].Value;
        }
        var mTitle = ("Title: " + movie.Title);
        var mYear = ("Released in: " + movie.Year);
        var mIntDBRate = ("IMDB Rating: " + movie.imdbRating);
        var mRTRating = ("RT Rating: " + rating);
        var mCountry = ("Country: " + movie.Country);
        var mLang = ("Language(s): " + movie.Language);
        var mPlot = ("Plot: " + movie.Plot);
        var mCast = ("Cast members: " + movie.Actors);
        var movieArray = (mTitle + "\n" + mYear + "\n" + mIntDBRate + "\n" + mRTRating + "\n" + mCountry + "\n" + mLang + "\n" + mPlot + "\n" + mCast);
        console.log(movieArray);
        recordLog(mBreak + "\n" + movieArray + "\n" + mBreak + "\n");
        // console.log("Title: " + movie.Title);
        // console.log("Released in: " + movie.Year);
        // console.log("IMDB Rating: " + movie.imdbRating);
        // console.log("RT Rating: " + rating);
        // console.log("Country: " + movie.Country);
        // console.log("Language(s): " + movie.Language);
        // console.log("Plot: " + movie.Plot);
        // console.log("Cast members: " + movie.Actors);
    });
}

function justDoIt(data) {
    var rBreak = "######## RANDOM INFO #########";
    recordLog("\n"+rBreak+"\n");
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            console.log(err);
        }
        console.log(data);
        var defaultSong = (data.split(",")[1]);
        spotSong(defaultSong);
        recordLog(data);

    })
}

function recordLog(vals) {
    fs.appendFile("log.txt", vals, function (err) {
        if (err) {
            return console.log(err);
        }
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

