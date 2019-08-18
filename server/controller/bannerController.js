const db = require('../db/db.js')

exports.query = async (req, res, next) => {
    try {
        const sql = `SELECT id,name,bannerurl FROM banners ORDER BY id desc`
        const resu = await db.query(sql)
        res.status(200).json(resu)
    } catch (err) {
        next(err)
    }


}
exports.add = async (req, res, next) => {
    try {
        const body = req.body
        if (body.name && body.bannerurl) {
            const addsql = `INSERT INTO banners(name,bannerurl) VALUES('${body.name}','${body.bannerurl}')`
            const result = await db.query(addsql)
            res.status(200).json(result)
        } else {
            res.status(400).json(body)
        }

    } catch (err) {
        next(err)
    }

}
exports.update = async (req, res, next) => {
    try {
        const body = req.body
        const sql = `UPDATE banners SET name='${body.name}',bannerurl='${body.bannerurl}' WHERE id='${body.id}'`
        const resu = await db.query(sql)
        res.status(200).json(resu)
    } catch (err) {
        next(err)
    }

}
exports.queryOne = async (req, res, next) => {
    try {
        const sql = 'select * FROM banners WHERE id=' + req.params.id + ' LIMIT 1'
        const resu = await db.query(sql)
        res.status(200).json(resu)
    } catch (err) {
        next(err)
    }
}

exports.delete = async (req, res, next) => {
    try {
        const sql = 'DELETE FROM banners WHERE id=' + req.params.id
        const resu = await db.query(sql)
        res.status(200).json(resu)
    } catch (err) {
        next(err)
    }
}