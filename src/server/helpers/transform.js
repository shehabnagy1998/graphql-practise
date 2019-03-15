const { getEvent, getEvents, getUser } = require('../helpers/getObject');

const transformEvent = (event) => {
    return {
        ...event._doc,
        date: new Date(event._doc.date).toISOString(),
        creator: getUser(event._doc.creator)
    }
}

const transformUser = (event) => {
    return {
        ...event._doc,
        password: null,
        createdEvents: getEvents(event._doc.createdEvents)
    }
}

const transformBooking = (event) => {
    return {
        ...event._doc,
        user: getUser(event._doc.user),
        event: getEvent(event._doc.event),
        createdAt: new Date(event._doc.createdAt).toISOString(),
        updatedAt: new Date(event._doc.updatedAt).toISOString()
    }
}

exports.transformEvent = transformEvent;
exports.transformUser = transformUser;
exports.transformBooking = transformBooking;