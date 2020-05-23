const express = require('express');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const PORT = 4000;
const app = express();

const homeRouter = require('./routes/home');
const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
const showsRouter = require('./routes/shows');
const personsRouter = require('./routes/persons');

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRouter);
app.use('/user', usersRouter);
app.use('/movie', moviesRouter);
app.use('/show', showsRouter);
app.use('/person', personsRouter);

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

// mongodb+srv://admin:<password>@movieusers-c4ykc.gcp.mongodb.net/movieshow_users?retryWrites=true&w=majority
