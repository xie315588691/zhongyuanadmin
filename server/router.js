const express = require('express')
const router = express.Router()

const jwt = require('jsonwebtoken')
const assert = require('http-assert')
const multer = require('multer')
const MAO = require('multer-aliyun-oss');
const db = require('./db/db.js')

const menuController = require('./controller/menuController.js')
const bannerController = require('./controller/bannerController.js')
const articleController = require('./controller/articleController.js')
const webseoController = require('./controller/webseoController.js')

const userController = require('./controller/userController.js')
const sessionController = require('./controller/sessionController.js')

function checkLogin(req, res, next) {
    const token = String(req.headers.authorization || '').split(' ').pop()
    assert(token, 500, '请登录')
    const tokenData = jwt.verify(token, 'xiaoxin')
    assert(tokenData.id, 500, '请登录')
    req.user = db.query(`select id,username FROM user WHERE id= '${tokenData.id}'`)
    assert(req.user, 500, '请登录')
    next()
}

/*
* menu
* */
router
    .get('/menus', checkLogin, menuController.query)
    .post('/menus', checkLogin, menuController.add)
    .patch('/menus/:id', checkLogin, menuController.update)
    .get('/menus/:id', checkLogin, menuController.queryOne)
    .delete('/menus/:id', checkLogin, menuController.delete)
/**
 * banner
 */
router
    .get('/banners', checkLogin, bannerController.query)
    .post('/banners', checkLogin, bannerController.add)
    .patch('/banners/:id', checkLogin, bannerController.update)
    .get('/banners/:id', checkLogin, bannerController.queryOne)
    .delete('/banners/:id', checkLogin, bannerController.delete)
/**
 * article
 */

router
    .post('/articleList', checkLogin, articleController.query)
    .post('/articles', checkLogin, articleController.add)
    .patch('/articles/:id', checkLogin, articleController.update)
    .get('/articles/:id', checkLogin, articleController.queryOne)
    .delete('/articles/:id', checkLogin, articleController.delete)
/**
 *session
 */
router
    .get('/session', sessionController.query)
    .post('/session', sessionController.new)
    .delete('/session', checkLogin, sessionController.delete)
/**
 * webseo
 */
router
    .patch('/webseo', checkLogin, webseoController.update)
    .get('/webseo', checkLogin, webseoController.queryOne)
/**
 * user
 */
router
    .post('/userEdit', checkLogin, userController.update)
    .post('/users', checkLogin, userController.queryOne)


/**
 * upload
 *
 */
var upload = multer({
    storage: MAO({
        config: {
            region: 'aa',
            accessKeyId: 'aa',
            accessKeySecret: 'aa',
            bucket: 'aa'
        }
    })
})

router.post('/uploads', upload.single('file'), (req, res, next) => {
    try {
        const file = req.file
        file.urlPath = `http://image.xiaoxinseo.com/${file.filename}`
        // console.log(file);
        res.json(file)
    } catch (err) {
        next(err)
    }
})

module.exports = router