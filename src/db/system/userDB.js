const {db} = require('../database');
import {isNotEmptyObject} from "@/utils/ObjectUtils";

// 根据条件查询所有用户
export function listAllUser(query) {
    let sql = `select id,username,nickname,role from user where 1 = 1`
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

//根据id查询用户
export function getUserById(id) {
    let sql = `select id,username,nickname,role from user where id = ${id}`
    return new Promise((resolve, reject) => {
        db.get(sql, (err, row) => {
            if (err) {
                reject(err);
            }
            resolve(row);
        });
    });
}

export function getUserByUsername(username) {
    let sql = `select id,username,nickname,role from user where username = '${username}'`
    return new Promise((resolve, reject) => {
        db.get(sql, (err, row) => {
            if (err) {
                reject(err);
            }
            resolve(row);
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
            `INSERT INTO user(username, nickname, password,role) VALUES('${data.username}', '${data.nickname}', '123456',${data.role})`,
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

// 更新
export function updateUser(data) {
    return new Promise((resolve, reject) => {
        db.run(
            `UPDATE user SET username='${data.username}', nickname='${data.nickname}', role=${data.role} WHERE id=${data.id}`,
            function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            }
        );
    });
}