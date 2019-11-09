require('dotenv').config();

const express     = require('express');
const createError = require('http-errors');
const cors        = require('cors');
const path        = require('path');
const logger      = require('morgan');
const bodyParser  = require('body-parser');
const cookieParser = require('cookie-parser');

const indexRouter  = require('./app/routes');
const userRouter   = require('./app/routes/auth/');
const makerRouter  = require('./app/routes/maker/');
const commonRouter = require('./app/routes/common/');

const app = express();

app.use(cors());
app.set('jwt-secret', process.env.JWT_USER_KEY);

app.set('views', path.join(__dirname, 'assets/views'));
app.set('view engine', 'jade');

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extends : false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'assets/public')));

app.use('/'      , indexRouter);
app.use('/api/'      , indexRouter);
app.use('/api/user'  , userRouter);
app.use('/api/maker' , makerRouter);
app.use('/api/common', commonRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
