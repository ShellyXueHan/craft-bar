const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs');
const methodOverride = require('method-override');

// Routers:
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const beerRouter = require('./routes/beer');
const authRouter = require('./routes/auth');

// APIs:
const indexAPI = require('./api/indexAPI');
const beerAPI = require('./api/beerAPI');

const app = express();

// view engine setup with hbs:
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

hbs.registerHelper('select', (selected, options) => {
  return options.fn(this).replace(
    new RegExp(' value=\"' + selected + '\"'),
    '$& selected="selected"',
  );
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/beer', beerRouter);
app.use('/auth', authRouter);

// Setup APIs:
app.use('/api/v1', indexAPI);
app.use('/api/v1/beer', beerAPI);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

module.exports = app;
