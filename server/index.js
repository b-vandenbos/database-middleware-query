let express = require('express');
let app = express();
let session = require('express-session');
let controller = require('./controller');
let checkForSession = require('./middleware.js');

//Server - Middleware (Top level)
app.use(express.json());
app.use(session({
    secret: '1230123j1230h',
    resave: false,
    saveUninitialized: true
}));

app.post('/login', controller.login);
app.post('/logout', controller.logout);

//Server - Middleware (Request level)
app.get('/data', checkForSession, controller.getData);


app.listen(4000, () => console.log(`The server is listening on port 3000`))
