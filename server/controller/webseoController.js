const db = require('../db/db.js')

exports.update = async (req, res, next) => {
    try {
        const body = req.body
        const sql = `UPDATE webseo SET title='${body.title}',keywords='${body.keywords}',
       description='${body.description}' WHERE id=111`
        const resu = await db.query(sql)
        res.status(200).json(resu)
    } catch (err) {
        next(err)
    }

}
exports.queryOne = async (req, res, next) => {
    try {
        const sql = 'SELECT * FROM webseo limit 1'
        const resu = await db.query(sql)
        res.status(200).json(resu)
    } catch (err) {
        next(err)
    }
}

