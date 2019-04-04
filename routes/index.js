var express          = require('express');
var router           = express.Router();
var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyA2IyA96NMZYwiOPc-aZ9nRKps1izG5CrQ'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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
   @params: query 
   @param:  pagetoken
*/

router.get('/api/places', function(req, res, next) {
    var query = req.query.query
    var response = googleMapsClient.places({
	query: query
    }, function(err, response) {
	if (!err) {
	    res.send(response);
	}
    });
});

/**
   @params: placeid
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

router.get('/api/nearby', function(req, res, next) {
    var latlng = req.query.latlng
    var response = googleMapsClient.placesNearby({
	location: latlng,
	radius  : 5000
    }, function(err, response) {
	if (!err) {
	    res.send(response);
	}
    });
});

router.get('/api/nearby', function(req, res, next) {
    var latlng = req.query.latlng
    var response = googleMapsClient.placesNearby({
	location: latlng,
	radius  : 5000
    }, function(err, response) {
	if (!err) {
	    res.send(response);
	}
    });
});



module.exports = router;
