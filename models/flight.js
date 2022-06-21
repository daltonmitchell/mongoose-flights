const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const destinationSchema = new Schema({
    airport: {
        type: String,
        require: {
            enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN']
        }
    },
    arrival: Date
})

const flightSchema = new Schema({
    airline: {
        type: String,
        require: {
            enum: ['American', 'Southwest', 'United']
        }
    },
    airport: {
        type: String, 
        default: 'DEN',
        require: {
            enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN']
        }
    },
    flightNo: {
        type: Number,
        required: {
            min: 10,
            max: 9999
        }
    },
    departs: {type: Date, default: Date.now(+1)},
    destinations: [destinationSchema]
});

module.exports = mongoose.model('Flight', flightSchema);