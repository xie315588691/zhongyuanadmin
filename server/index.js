const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const session = require('express-session')
const router = require('./router.js')

const app = express()
app.set('secret','xiaoxin')

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors())
app.use(router)


app.use((err, req, res, next) => {
    res.status(500).json({
        error: err.message
    })
})
app.listen('3000', () => {
    console.log('http://localhost:3000 is running');
})