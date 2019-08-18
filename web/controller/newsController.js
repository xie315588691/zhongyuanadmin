const db = require('../db/db.js')

exports.get = async (req, res) => {
    res.render('zx')
}

exports.pageQuery = async (req, res) => {
    const body = req.body
    const start = (body.currentPage - 1) * body.pageSize
    const sql = `SELECT id,title,keywords,menu,imgurl,createtime,descript FROM article  ORDER BY id DESC LIMIT ${start} ,${body.pageSize}`
    const resu = await db.query(sql)
    const countsql = `SELECT count(*) as total FROM article `
    const total = await db.query(countsql)
    res.status(200).json({
        resu: resu,
        total: total[0].total
    })
}
exports.queryOne = async (req, res) => {

    const body = req.params
    const sql = `SELECT * FROM article  where id='${body.id}' LIMIT 1 `
    const resu = await db.query(sql)
    const moreSql = `SELECT id,title,descript,createtime from article ORDER BY id desc LIMIT 10`
    const moreresu = await db.query(moreSql)
    res.render('pageInfo', {
        article: resu[0],
        moreArticle: moreresu
    })
}