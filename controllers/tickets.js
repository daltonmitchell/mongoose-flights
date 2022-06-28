const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
    show,
    create,
}

function show(req, res){
    Flight.findById(req.params.id, function(err, flight){
        res.render('tickets/new', {
            flight
        })
    })
}

function create(req, res){
    Flight.findById(req.params.id, function(err, flight){
        req.body.price=parseInt(req.body.price);
        req.body.flight = req.params.flight;
        let newTicket = new Ticket(req.body);
        newTicket.save();
        flight.tickets.push(newTicket);
        flight.save(function(err, flight){
            if(err) console.log(err)
            console.log(flight)
            res.redirect(`/flights/${flight._id}`)
        })
    })
}