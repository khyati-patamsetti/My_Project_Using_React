const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');  
const mongoose = require('mongoose'); 
const bodyParser = require('body-parser');  
const Routes = require('./routes/Routes.js'); 
const app = express();
mongoose.connect(process.env.MONGODB_URI)
  .then(result => {
    console.log("Connected successfully");
  })
  .catch(err => {
    console.log("MongoDB connection error: ", err);
  }); 
app.set('views', path.join(__dirname, 'views'));  
app.set('view engine', 'jade');
app.use(cors());
app.use(express.json());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false })); 
app.use(logger('dev')); 
app.use(cookieParser()); 
app.use(express.static(path.join(__dirname, 'public')));
app.use("/", Routes);
app.use(function(req, res, next) {
    next(createError(404));
});
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});
app.listen(9000, function() {
    console.log("Server started");
});
module.exports = app;
