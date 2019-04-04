var express          = require('express');
var router           = express.Router();
var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyA2IyA96NMZYwiOPc-aZ9nRKps1izG5CrQ'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome to Club Walrus' });
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

router.get('/api/places', function(req, res, next) {
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

router.get('/api/place', function(req, res, next) {
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
   @param: keyword
   @param: pagetoken
*/

router.get('/api/nearby', function(req, res, next) {
    var parameters = {}

    if (req.query.location) {
	parameters.query = req.query.location;
    }
    if (req.query.radius) {
	parameters.query = req.query.radius;
    }
    if (req.query.type) {
	parameters.pagetoken = req.query.types;
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

router.get('/api/placephoto', function(req, res, next) {
    var parameters = {};

    if (req.query.photoreference) {
	parameters.photoreference = req.query.photoreference;
    }
    if (req.query.maxheight) {
	parameters.maxheight = req.query.maxheight;
    }
    if (req.query.maxwidth) {
	parameters.maxwidth = req.query.maxwidth;
    }

    var response = googleMapsClient.placesNearby(parameters, function(err, response) {
	if (!err) {
	    res.send(response);
	}
    });
});



module.exports = router;
