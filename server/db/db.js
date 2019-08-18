const mysql = require('mysql')

var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '321321',
    database: 'qibaoying',
    multipleStatements: true//配置多条sql查询
})

exports.query = function (sqlStr) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                return reject(err)
            }
            connection.query(sqlStr, (err, ...args) => {
                //释放连接
                connection.release();
                if (err) {
                    return reject(err)
                }
                resolve(...args)
            })
        })
    })
}