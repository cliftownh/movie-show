const express = require('express'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  createError = require('http-errors'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  logger = require('morgan'),
  path = require('path'),
  cors = require('cors'),
  session = require('express-session'),
  User = require('./models/user'),
  LocalStrategy = require('passport-local').Strategy,
  { accessSecret, mongoDB } = require('./api');
const MongoStore = require('connect-mongo')(session);

const homeRouter = require('./routes/home'),
  usersRouter = require('./routes/users'),
  reviewsRouter = require('./routes/reviews');

const PORT = 4000;
const app = express();

//Set up default mongoose connection
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function () {
  console.log('MongoDB database connection established successfully');
});

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000'
  })
);
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: accessSecret,
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({
      mongooseConnection: db,
      touchAfter: 1800
    })
  })
);

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/* JWT strategy to be implemented later
passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret
    },
    async (jwt_payload, done) => {
      try {
        const user = await User.findById(jwt_payload.id);
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);
*/

app.use('/', homeRouter);
app.use('/user', usersRouter);
app.use('/review', reviewsRouter);

/*
 ** Catch 404 and forward to error handler
 */
app.use((req, res, next) => {
  const err = createError(404, 'Not Found');
  next(err);
});

/*
 ** Error handler
 */
app.use((err, req, res, next) => {
  res.locals.error = err;
  res.locals.message = err.message;

  res.status(err.status || 500).json({
    status: err.status,
    message: err.message
  });
});

app.listen(PORT, function () {
  console.log('Server is running on Port: ' + PORT);
});

module.exports = app;
