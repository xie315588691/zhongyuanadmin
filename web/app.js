const express = require('express')
const bodyParser = require('body-parser')

var moment = require('moment');
var shortDateFormat = 'ddd @ h:mmA';

const app = express()
const router = require('./router.js')
app.locals.moment = moment;
app.locals.shortDateFormat = shortDateFormat;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())

app.set("view engine", "ejs");
app.set('views', __dirname + '/views');
app.use(express.static('public'));

app.use(router)

app.use(function (req, res) {
    res.render('404')

})
app.listen('8088', () => {
    console.log("http//localhost:8088 is running");
})