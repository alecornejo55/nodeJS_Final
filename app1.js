const express = require('express');
const flash = require('connect-flash');
const config = require('./src/config/globals');
// traemos el archivo de configuracion de winston
const { createLogger } = require('./src/config/logger.config');
const logger = createLogger('PROD');

const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// Handlebars
const Handlebars = require('handlebars')
const { engine } = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')

// Pasport
const passport = require('passport');
const { initializePassport } = require('./src/config/passport.config');

// Session 
const session = require('express-session');
const cookieParser = require('cookie-parser');
app.set('socketio', io);

const MongoStore = require('connect-mongo');
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

const {  checkLogout } = require('./src/middlewares/auth');

const { productRouterApi, cartRouterApi, publicRouter, userRouter, chatRouter } = require('./src/routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("logger", logger);

app.use(session({
    store: MongoStore.create({
        mongoUrl: config.MONGO_URI,
        mongoOptions: advancedOptions,
    }),
    // key: 'user_sid',
    secret: 'c0d3r',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 20, // 1 segundo * 60 = 1 minuto
    },
    rolling: true,
}));

// Passport config
initializePassport();
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Handlebars config
app.engine('handlebars', engine({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', 'handlebars');

app.set('views', './src/views');
app.use(express.static(__dirname + "/src/public"));

app.use('/api/product', productRouterApi);
app.use('/api/cart', checkLogout, cartRouterApi);
app.use('/api/user', userRouter);
app.use('/api/chat', chatRouter);
app.use('/', publicRouter);


/** comodín */
app.use('*', function(req, res){
    const path = req.originalUrl;
    const metodo = req.method;
    res.status(401).json({
        error: -2,
        descripcion:`ruta ${path} método ${metodo} no implementada`
    });
});


server.listen(3000, () => {
  console.log('listening on *:3000');
});