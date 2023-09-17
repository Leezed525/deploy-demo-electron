/**
 * @Description: 数据库连接
 * @Author: Leezed
 * @CreationDate 2023-09-11 12:41:59
 */

const sqlite3 = require('sqlite3')
// const NODE_ENV = process.env.NODE_ENV
const path = require('path')
// const {app} = require('electron')
const os = require('os')
const fs = require('fs')
const homedir = os.homedir(); // 用于获取当前用户的主目录路径
//判断用户目录下是否有config文件夹，没有则创建
if (!fs.existsSync(path.join(homedir, '/config'))) {
    fs.mkdirSync(path.join(homedir, '/config'));
}
let DB_PATH = path.join(homedir, '/config/demo.db');
// if (NODE_ENV !== 'development') {
//     DB_PATH = path.join(path.dirname(app.getPath('exe')), '/config/demo.db');
// }
console.log('👉👉👉-----------------DB_PATH', DB_PATH)


/**
 * @Description: 连接数据库
 * @CreationDate 2023-05-10 13:48:41
 */
function connectDatabase() {
    return new sqlite3.Database(DB_PATH, (err) => {
        if (err) {
            console.error('--------------------connectDatabaseErr' + err.message);
        }
        console.log('👉👉👉-----------------sqlite3已经连接成功')
    });
}

const db = connectDatabase();

/**
 * @Description: 创建数据库,如果用户本地没有数据库的话就创建否则跳过
 * @CreationDate 2023-05-10 13:44:48
 */
function createDataTable() {
    /**
     * @Description: 创建用户表
     * @CreationDate 2023-06-01 22:53:23
     */

    db.serialize(function () {
        db.run('create table if not exists user (id INTEGER PRIMARY KEY AUTOINCREMENT, username text, nickname text, password text,role INTEGER);');
    });
    // db.close();
}

exports.connectDatabase = connectDatabase;
exports.createDataTable = createDataTable;
exports.db = db;