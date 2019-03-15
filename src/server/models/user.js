const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdEvents: [{
        type: Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    }]
});

module.exports = mongoose.model('User', userSchema)