const {db} = require('../database');

// 查询
export function listAllUser() {
    return new Promise((resolve, reject) => {
        db.all('select * from user', (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        });
    });
}


// 新增
function insertUser(data) {
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
