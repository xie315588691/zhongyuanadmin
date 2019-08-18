const db = require('../db/db.js')

exports.query = async (req, res, next) => {
    try {
        const resu = await db.query('SELECT * FROM menus ORDER BY id desc')
        res.status(201).json(resu)
    } catch (err) {
        next(err)
    }


}
exports.add = async (req, res, next) => {
    try {
        const body = req.body
        if (!body.pid) {
            body.pid = 0
        }
        const addsql = `INSERT INTO menus(name,menuurl,pid)
    VALUES('${body.name}','${body.menuurl}','${body.pid}')`

        const result = await db.query(addsql)
        res.status(201).json(result)

    } catch (err) {
        next(err)
    }

}
exports.update = async (req, res, next) => {
    try {
        const body = req.body
        if (!body.pid) {
            body.pid = 0
        }
        const sql = 'UPDATE menus SET name=' + body.name + ',menuurl=' + body.menuurl + ',pid=' + body.pid + ' WHERE id=' + body.id
        const resu = await db.query(sql)
        res.status(201).json(resu)
    } catch (err) {
        next(err)
    }

}
exports.queryOne = async (req, res, next) => {
    try {
        const sql = 'select * FROM menus WHERE id=' + req.params.id + ' LIMIT 1'
        const resu = await db.query(sql)
        res.status(201).json(resu)
    } catch (err) {
        next(err)
    }
}

exports.delete = async (req, res, next) => {
    try {
        const sql = 'DELETE FROM menus WHERE id=' + req.params.id
        const resu = await db.query(sql)
        res.status(201).json(resu)
    } catch (err) {
        next(err)
    }
}