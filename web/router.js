const express = require('express')
const router = express.Router()

const indexControler = require('./controller/indexController.js')
const newsControler = require('./controller/newsController.js')
router
    .get('/', indexControler.get)
    .get('/index.html', indexControler.get)
    .get('/grfw.html', (req, res) => {
        res.render('grfw')
    })

    .get('/qyfw.html', (req, res) => {
        res.render('qyfw')
    })
    .get('/contact.html', (req, res) => {
        res.render('contact')
    })
/**
 * news
 */
router
    .get('/zx.html', newsControler.get)
    .get('/zx', newsControler.get)
    .post('/news', newsControler.pageQuery)
    .get('/news/:id',newsControler.queryOne)

module.exports = router