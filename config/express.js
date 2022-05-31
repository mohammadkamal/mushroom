var config = require('./config'),
    http = require('http'),
    socketio = require('socket.io')(),
    express = require('express'),
    morgan = require('morgan'),
    compress = require('compression'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    MongoStore = require('connect-mongo'),
    flash = require('connect-flash'),
    passport = require('passport'),
    oauth2orize = require('oauth2orize');

module.exports = function (db) {
    var app = express();
    var oauth2orizeServer = oauth2orize.createServer();
    var server = http.createServer(app);
    var io = socketio.listen(server);

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }

    app.use(express.urlencoded({
        extended: true
    }));
    app.use(express.json());
    app.use(methodOverride());

    var mongoStore = new MongoStore({
        mongoUrl: config.db
    });

    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret,
        store: mongoStore
    }));

    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    app.use(flash());

    app.use(passport.initialize());
    app.use(passport.session());

    require('../app/routes/index.server.routes.js')(app);
    require('../app/routes/users.server.routes.js')(app);
    require('../app/routes/articles.server.routes.js')(app);

    app.use(express.static('./public'));

    require('./socketio')(server, io, mongoStore);
    return server;
};