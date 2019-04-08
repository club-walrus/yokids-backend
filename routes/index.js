var express          = require('express');
var cors             = require('cors');
var router           = express.Router();
var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyAZqUTPIqmEf3nCXqgOtDevR_1EArNYwsY',
    Promise: Promise
});

var corsOptions =
    {
	"origin": "*",
	"methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
	"preflightContinue": false,
	"optionsSuccessStatus": 204
    };


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Club Walrus' });
});

router.get('/api/geocode', function(req, res, next) {
    var response = googleMapsClient.geocode({
	address: '1600 Amphitheatre Parkway, Mountain View, CA'
    }, function(err, response) {
	if (!err) {
	    res.send(response);
	}
    });
});

/**
   @param: query
   @param: pagetoken
   @param: type
*/

router.get('/api/places', cors(corsOptions), function(req, res, next) {
    var parameters = {};

    if (req.query.query) {
	parameters.query = req.query.query;
    }
    if (req.query.pagetoken) {
	parameters.pagetoken = req.query.pagetoken;
    }
    if (req.query.types) {
	parameters.pagetoken = req.query.types;
    }

    var response = googleMapsClient.places(parameters, function(err, response) {
	if (!err) {
	    res.send(response);
	}
    });
});

/**
   @param: placeid
*/

router.get('/api/place', cors(corsOptions), function(req, res, next) {
    var placeid = req.query.placeid;
    var response = googleMapsClient.place({
	placeid: placeid
    }, function(err, response) {
	if (!err) {
	    res.send(response);
	}
    });
});

/**
   @param: location
   @param: radius
   @param: types
   @param: pagetoken
*/

router.get('/api/nearby', cors(corsOptions), function(req, res, next) {
    var parameters = {}

    if (req.query.location) {
	parameters.location = req.query.location;
    }
    if (req.query.radius) {
	parameters.radius = req.query.radius;
    }
    else {
	parameters.radius = 10000
    }

    if (req.query.type) {
	parameters.type = req.query.type;
    }
    if (req.query.pagetoken) {
	parameters.pagetoken = req.query.pagetoken;
    }
    var response = googleMapsClient.placesNearby(parameters, function(err, response) {
	if (!err) {
	    res.send(response);
	}
    });
});

/**
   @param: photoreference
   @param: maxheight
   @param: maxwidth
*/

router.get('/api/placephoto', cors(corsOptions), function(req, res, next) {
    var parameters = {};

    if (req.query.photoreference) {
	parameters.photoreference = req.query.photoreference;
    }
    if (req.query.maxheight) {
	parameters.maxheight = parseInt(req.query.maxheight, 10);
    }
    if (req.query.maxwidth) {
	parameters.maxwidth = parseInt(req.query.maxwidth, 10);
    }

    var response = googleMapsClient.placesPhoto(parameters).asPromise()
	.then(function(response) {
	    res.append('location',  "https://" + response.socket._host + response.req.path);
	    res.sendStatus(302);
	})
	.catch((err) => {
	    console.log(err);
	});
});


module.exports = router;
