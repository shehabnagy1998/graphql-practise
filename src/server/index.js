const express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    app = express(),
    mongoose = require('mongoose'),
    URL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0-3zapg.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`,
    graphqlHTTP = require('express-graphql'),
    schema = require('./graphql/schemas/index'),
    rootValue = require('./graphql/resolvers/index');

const auth = require('./middleware/authentication');


app.use(cors(), bodyParser.json());
app.use(auth);
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue,
    graphiql: true
}));

mongoose.connect(URL, { useNewUrlParser: true }).then(_ => {
    app.listen(process.env.PORT, _ => { console.log(`listen on port ${process.env.PORT}`); });
}).catch(err => { console.log(err) })
