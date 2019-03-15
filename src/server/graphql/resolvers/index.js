const userResolver = require('./user'),
    eventResolver = require('./event'),
    bookingResolver = require('./booking');

const rootResolver = {
    ...userResolver,
    ...eventResolver,
    ...bookingResolver
}

module.exports = rootResolver