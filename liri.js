var keys = require("./key.js");
var fs = require('fs');
var twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');

var input = function(caseD, funcD) {
	switch (caseD) {
		case 'my-tweets':
			getTweets();
			break;
		case 'spotify-this-song':
			getSpot(funcD);
			break;
		case 'movie-this':
			getMovie(funcD);
			break;
		case 'do-what-it-says':
			doIt();
			break;
		default:
			console.log('LIRI DK!');
	}
};

var getTweets = function() {
	console.log('tweets run');
	var use = new twitter(keys.twitterKeys);

	var par = {
		screen_name: 'Anon',
		count: 20
	};

	use.get('statuses/user_timeline', par, function(error, tweets, response) {
		var data = []
		if (!error) {
			// var data = [];
			for (var i=0; i <tweets.length; i++) {
				data.push({
					'Created at: ' : tweets[i].created_at,
					'Tweets: ' : tweets[i].text
				});
			}
		}
			console.log(data);
	});
};

var getArtistNames = function(artist) {
	return artist.name;
};

var getSpot = function(song) {
	if (song === undefined) {
		song = 'What\'s my age again';
	};

	spotify.search({ type: 'track', query: song }, function(err, data) {
		if (err) {return console.log(err);}

	var songs = data.tracks.items;
	var data = [];

	for (var i=0; i < songs.length; i++) {
		data.push({
			'artist(s)' : songs[i].artist.map(getArtistNames),
			'song name: ' : songs[i].name,
			'preview song: ' : songs[i].preview_url,
			'album: ' : songs[i].album.name
		});
	}
	console.log(data);

}

)};

var getMovie = function(movieName) {
	if (movieName === undefined) {
		movieName = 'Mr Nobody';
	}

	var urlHit = 'http://www.ombdapi.com/?t=' + movieName + '&y=&plot=full&tomatoes=true&r=json';

	request(urlHit, function(error, response, body) {
		if (!error && response.statusCode == 200) {
			var data= [];
			var jsonData = JSON.parse(body);

			data.push({
				'Title: ' : jsonData.Title,
				'Year: ' : jsonData.Year,
				'Rated: ' : jsonData.Rated,
				'IMDB Rating: ' : jsonData.imbdRating,
				'Country: ' : jsonData.Country,
				'Language: ' : jsonData.Language,
				'Plot: ' : jsonData.Plot,
				'Actor: ' : jsonData.Actors,
				'Rotten Tomatoes Rating: ' : jsonData.tomatoRating,
				'Rotten Tomatoes URL: ' : jsonData.tomatoURL
			});
			console.log(data);
		}
	});
}

var doIt = function() {
	fs.readFile('random.txt', 'utf8', function(error, data) {
		console.log(data);
		var dataArr = data.split(',');

		if (dataArr.length == 2) {
			use(data.Arr[0], dataArr[1]);
		} else if (data.Arr.length == 1) {
			use(dataArr[0]);
		}
	});
}

var run = function(one, two) {
	input(one, two);
};

run(process.argv[2], process.argv[3]);

