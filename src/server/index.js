const express = require('express'),
    express_graphql = require('express-graphql'),
    cors = require('cors'),
    port = process.env.PORT || 8080,
    app = express();

app.use(cors());
app.use('/graphql', express_graphql({

}));

app.listen(port, _ => { console.log(`listen on port ${port}`); });

