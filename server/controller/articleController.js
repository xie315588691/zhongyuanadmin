const db = require('../db/db.js')

exports.query = async (req, res, next) => {
    try {
        const totalSql = 'SELECT count(*) as count FROM article'
        const totalResu = await db.query(totalSql)
        const body = req.body
        const start = (body.currentPage - 1) * body.pageSize
        let searchSql = "SELECT id,title,keywords,menu,imgurl,createtime  FROM article WHERE 1=1 "
        if (body.menu) {
            searchSql += " AND menu= " + body.menu
        }
        if (body.title) {
            searchSql += " AND title LIKE  '%" + body.title + "%'"
        }
        searchSql += ' ORDER BY id desc LIMIT ' + start + ', ' + body.pageSize


        const resu = await db.query(searchSql)
        res.status(200).json({
            resu: resu,
            total: totalResu[0].count
        })
    } catch (err) {
        next(err)
    }
}
exports.add = async (req, res, next) => {
    try {
        const body = req.body
        body.createtime = Date.now()
        if (body.title && body.keywords && body.menu && body.descript) {
            const addsql = `INSERT INTO article(title,keywords,menu,descript,imgurl,body,createtime)
            VALUES('${body.title}','${body.keywords}',${body.menu},'${body.descript}','${body.imgurl}','${body.body}','${body.createtime}')`
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
        console.log(body);
        const sql = `UPDATE article SET title='${body.title}',keywords='${body.keywords}',
        body='${body.body}',menu='${body.menu}',descript='${body.descript}',imgurl='${body.imgurl}'
        WHERE id='${body.id}'`
        const resu = await db.query(sql)
        res.status(200).json(resu)
    } catch (err) {
        next(err)
    }

}
exports.queryOne = async (req, res, next) => {
    try {
        const sql = 'select * FROM article WHERE id=' + req.params.id + ' LIMIT 1'
        const resu = await db.query(sql)
        res.status(200).json(resu)
    } catch (err) {
        next(err)
    }
}

exports.delete = async (req, res, next) => {
    try {
        const sql = 'DELETE FROM article WHERE id=' + req.params.id
        const resu = await db.query(sql)
        res.status(200).json(resu)
    } catch (err) {
        next(err)
    }
}