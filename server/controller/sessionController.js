const md5 = require('md5')
const jwt = require('jsonwebtoken')
const db = require('../db/db.js')

exports.query = (req, res, next) => {
    const {user} = req.session
    if (!user) {
        return res.status(401).json({
            error: "用户没有授权"
        })
    }
    res.status(200).json(user)
}

exports.new = async (req, res, next) => {
    try {
        const body = req.body
        const sqlStr = `select id,username FROM user WHERE username= '${body.username}' AND password = '${md5(body.password)}'`
        const [result] = await db.query(sqlStr)
        if (!result) {
            return res.status(201).json({
                err: '账号或者密码输入有误!'
            })
        }
        const token = jwt.sign({id: result.id}, 'xiaoxin')
        res.status(200).json({user: result, token: token})
    } catch (e) {
        next(e)
    }
}

exports.delete = async (req, res, next) => {
    req.session.destroy(function (err, data) {
        if (err) {
            return res.status(404).json({
                err: "销毁失败"
            })
        }
        res.status(201).json({
            result: data
        })
    });

}