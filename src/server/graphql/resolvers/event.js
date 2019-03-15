const Event = require('../../models/event'),
    User = require('../../models/user'),
    { transformEvent } = require('../../helpers/transform');

const eventResolver = {
    events: async _ => {
        try {
            const events = await Event.find();
            return events.map(eve => {
                return transformEvent(eve)
            })
        } catch (err) { console.log(err) }
    },

    createEvent: async (args, req) => {
        try {

            if (!req.isAuth) {
                throw new Error('not logged in')
            }

            const user = await User.findOne({ _id: req.userId });
            if (!user) {
                throw new Error('user not found')
            }
            let userAcc = user;
            const eventExist = await Event.findOne({ title: args.eventInput.title });
            if (eventExist) { throw new Error('event with same title already exists') };
            event = new Event({
                title: args.eventInput.title,
                description: args.eventInput.description,
                date: new Date(args.eventInput.date),
                price: +args.eventInput.price,
                creator: req.userId
            });
            const savedEvent = await event.save();
            userAcc.createdEvents.push(event._id);
            await userAcc.save();
            return transformEvent(savedEvent)
        }
        catch (err) { console.log(err) }
    },

    deleteEvent: async (args) => {
        try {
            const event = await Event.findByIdAndDelete(args.id);
            return transformEvent(event)
        }
        catch (err) { console.log(err) }
    }
}

module.exports = eventResolver;