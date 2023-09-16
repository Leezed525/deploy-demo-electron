const {db} = require('../database');
import {isNotEmptyObject} from "@/utils/ObjectUtils";

// 查询
export function listAllUser(query) {
    let sql = `select * from user where 1 = 1`
    if (isNotEmptyObject(query.username)) {
        sql += ` and username like '%${query.username}%'`;
    }
    if (isNotEmptyObject(query.nickname)) {
        sql += ` and nickname like '%${query.nickname}%'`
    }
    if (isNotEmptyObject(query.role)) {
        sql += ` and role = ${query.role}`
    }
    return new Promise((resolve, reject) => {
        db.all(sql, (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        });
    });
}

//检查用户名密码是否正确
export function checkUser(data) {
    return new Promise((resolve, reject) => {
        db.get(`select * from user where username='${data.username}' and password='${data.password}'`, (err, row) => {
            if (err) {
                reject(err);
            }
            resolve(row);
        });
    });
}


// 新增
export function insertUser(data) {
    return new Promise((resolve, reject) => {
        db.run(
            `INSERT INTO user(username, nickname, password) VALUES('${data.name}', '${data.email}', '${data.phone}')`,
            function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            }
        );
    });
}
