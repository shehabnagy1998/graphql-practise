const express = require('express'),
    express_graphql = require('express-graphql'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    port = process.env.PORT || 8080,
    schema = require('./schema'),
    app = express();

app.use(cors());
app.use('/graphql', express_graphql({
    schema
}));

mongoose.connect('mongodb+srv://shehab90:shehab80@cluster0-3zapg.mongodb.net/graphql?retryWrites=true');
mongoose.connection.once('open', _ => {
    console.log('connection opened');
});

app.listen(port, _ => { console.log(`listen on port ${port}`); });

