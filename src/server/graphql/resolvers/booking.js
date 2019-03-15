const Event = require('../../models/event'),
    Booking = require('../../models/booking'),
    { getEvent, getEvents, getUser } = require('../../helpers/getObject'),
    { transformBooking } = require('../../helpers/transform');

const bookingResolver = {
    bookings: async _ => {
        try {
            const bookings = await Booking.find();
            return bookings.map(booking => {
                return transformBooking(booking)
            })
        } catch (err) { console.log(err) }
    },

    bookEvent: async (args) => {
        try {
            const reqEvent = await Event.findOne({ _id: args.eventId });
            if (!reqEvent) { throw new Error('event not exist') }
            const bookExist = await Booking.findOne({ user: "5c8ad9c42faec00a8872c440", event: args.eventId });
            if (bookExist) { throw new Error('user already booked this event') }
            let booking = new Booking({
                user: "5c8ad9c42faec00a8872c440",
                event: args.eventId
            });
            const bookingEvent = await booking.save();
            return transformBooking(bookingEvent)
        } catch (err) { console.log(err) }
    },

    cancelBook: async (args) => {
        const book = await Booking.findByIdAndDelete(args.bookingId);
        if (!book) { throw new Error('this booking not exist') }
        return transformBooking(book)
    }
}

module.exports = bookingResolver;