const db = require('../db/db.js')
const md5 = require('md5')


exports.update = async (req, res, next) => {
    try {
        const body = req.body
        const selectSql = `select * FROM user WHERE username= '${body.name}' AND password = '${md5(body.oldpass)}'`
        const result = await db.query(selectSql)
        if (!result.length) {
            res.status(201).json({
                msg: '账号密码输入有误'
            })
            return false
        }
        const sql = `UPDATE user SET username='${body.name}',password='${md5(body.pass)}' WHERE id='${result[0].id}'`
        const resu = await db.query(sql)
        res.status(200).json(resu)
    } catch (err) {
        next(err)
    }

}

exports.queryOne = async (req, res, next) => {
    try {
        const body = req.body
        const sql = `select * FROM user WHERE username= '${body.name}' AND password = '${md5(body.oldpass)}'`
        const resu = await db.query(sql)
        res.status(200).json(resu)
    } catch (err) {
        next(err)
    }
}

