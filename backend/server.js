const express = require('express'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  createError = require('http-errors'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  logger = require('morgan'),
  path = require('path'),
  cors = require('cors'),
  User = require('./models/user');
const MongoStore = require('connect-mongo')(session);

const homeRouter = require('./routes/home'),
  usersRouter = require('./routes/users'),
  moviesRouter = require('./routes/movies'),
  showsRouter = require('./routes/shows'),
  personsRouter = require('./routes/persons');

const PORT = 4000;
const app = express();

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

//Set up default mongoose connection
const mongoDB =
  'mongodb+srv://admin:admin@movieusers-c4ykc.gcp.mongodb.net/movieshow_users?retryWrites=true&w=majority';

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

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: 'secret',
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

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', homeRouter);
app.use('/user', usersRouter);
app.use('/movie', moviesRouter);
app.use('/tv', showsRouter);
app.use('/person', personsRouter);

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
