const db = require('../db/db.js')
exports.get = async (req, res) => {
    const sql = `SELECT * FROM article  ORDER BY id DESC LIMIT 10`
    const resu = await db.query(sql)
    const seoSql = `SELECT * FROM webseo WHERE id=111`
    const seoResu = await db.query(seoSql)
    res.render('index', {
        articles: resu,
        seo: seoResu[0]
    })
}