const Event = require('../models/event'),
    User = require('../models/user');

const getUser = async (id) => {
    try {
        const user = await User.findById(id);
        return {
            ...user._doc,
            password: null,
            createdEvents: getEvents(user._doc.createdEvents)
        }
    } catch (err) { console.log(err) }
};

const getEvents = async (eventsList) => {
    try {
        const events = await Event.find({ _id: { $in: eventsList } });
        return events.map(event => {
            return {
                ...event._doc,
                date: new Date(event._doc.date).toISOString(),
                creator: getUser(event._doc.creator)
            }
        })
    } catch (err) { console.log(err) }
};

const getEvent = async (id) => {
    try {
        const event = await Event.findById(id);
        return {
            ...event._doc,
            date: new Date(event._doc.date).toISOString(),
            creator: getUser(event._doc.creator)
        }
    } catch (err) { console.log(err) }
};

exports.getUser = getUser;
exports.getEvents = getEvents;
exports.getEvent = getEvent;