const { buildSchema } = require('graphql');

const schema = buildSchema(`
        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
            creator: User!
        }
        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
        }
        type User {
            _id: ID!
            email: String!
            password: String
            createdEvents: [Event!]
        }
        input UserInput {
            email: String!
            password: String!
        }
        type Booking {
            _id: ID!
            user: User!
            event: Event!
            createdAt: String!
            updatedAt: String!
        }
        type AuthData {
            userId: ID!
            token: String!
            expireTime: Int!
        }
        type RootQuery {
            events: [Event!]!
            users: [User!]!
            bookings: [Booking!]!
            login(userInput: UserInput!): AuthData
        }
        type RootMutation {
            createEvent(eventInput: EventInput!): Event
            deleteEvent(id: ID!): Event
            createUser(userInput: UserInput!): User
            deleteUser(id: ID!): User
            bookEvent(eventId: ID!): Booking
            cancelBook(bookingId: ID!): Booking
        }
        schema {
                query: RootQuery,
                mutation: RootMutation
            }
    `);

module.exports = schema