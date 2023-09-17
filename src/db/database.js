/**
 * @Description: 数据库连接
 * @Author: Leezed
 * @CreationDate 2023-09-11 12:41:59
 */
import {isEmptyObject} from "@/utils/ObjectUtils";

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
console.log('👉👉👉-----------------DB_PATH', DB_PATH)


/**
 * @Description: 连接数据库
 * @CreationDate 2023-05-10 13:48:41
 */
export function connectDatabase() {
    return new sqlite3.Database(DB_PATH, (err) => {
        if (err) {
            console.error('--------------------connectDatabaseErr' + err.message);
        }
        console.log('👉👉👉-----------------sqlite3已经连接成功')
    });
}

export const db = connectDatabase();

function checkUserTable() {
    let sql = `SELECT name from sqlite_master where type='table' and name='user'`;
    return new Promise((resolve, reject) => {
        db.get(sql, (err, row) => {
            if (err) {
                reject(err);
            }
            resolve(row);
        });
    });
}


export function initDatabase() {
    checkUserTable().then((row) => {
        if (isEmptyObject(row)) {
            console.log('👉👉👉-----------------user表不存在，创建user表')
            createUserTable();
        }
    }).catch((err) => {
        console.error(err);
    });
}


function createUserTable() {
    db.serialize(function () {
        db.run('create table  user (id INTEGER PRIMARY KEY AUTOINCREMENT, username text, nickname text, password text,role INTEGER);');
        db.run(`INSERT INTO user (username, nickname, password,role) VALUES ('root', '超级管理员', 'admin123',0);`)
    });
}

// exports.connectDatabase = connectDatabase;
// exports.initDatabase = initDatabase;
// exports.db = db;