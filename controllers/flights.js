const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
    new: newFlight,
    show,
    create,
    index,
};

function newFlight(req, res) {
    res.render('flights/new');
}

function show(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        Flight.find().populate('tickets');
        Ticket.find({flight: flight._id}, function(err, tickets){
            res.render('flights/show', { title: 'Flight Destinations', flight, tickets});
        })
    });
}

function create(req, res) {
    const flight = new Flight(req.body);
    flight.save(function(err) {
        if (err) return res.redirect('/flights/new');
        res.redirect('/flights');
    });
}

function index(req, res) {
    Flight.find({}, function(err, flights) {
        res.render('flights/index', {
            flights
        })
    })
}