var express = require('express');
var app = express();

//Example of middleware
var myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};

app.use(myLogger);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

//Middleware works like app.get/app.post, res.send finish the extraction
app.use('/hey', function (req, res) {
    res.send('Hey!');
});

//Changin the req content in the Middleware
app.use(function (req, res, next) {
  req.requestTime = new Date().toString();
  next();
});

app.get('/', function (req, res) {
  var responseText = 'Requested at: ' + req.requestTime + '. Like a boss! ';
  res.send(responseText);
});

//Using __dirname instead of the root path (__dirname is the folder that contains the server.js/ '/root' is wherever the server was run )
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/test.html')
});  

//Middleware func that is providing the 404 Error page when none of the app.routes that are written above ^^^ are not suitable
app.use(function (req, res, next) {
    console.log('404');
    res.sendFile(__dirname + '/public/404.html');
})

//Middleware func that is listening for the 500 Error
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something is broken!')
})

app.listen(8030);