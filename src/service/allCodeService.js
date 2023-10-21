import db from '../models/index';

// lấy thông tin AllCode theo 'type'
let getAllCode = (type) => {
    return new Promise(async (resolve, reject) => {
        try {
            let allCodeByType = [];

            if (type == 'All') {
                allCodeByType = await db.AllCode.findAll({});
            }
            else {
                allCodeByType = await db.AllCode.findAll({
                    where: { type: type },
                });
            }
            resolve({
                errCode: 0,
                message: 'OK',
                data: allCodeByType,
            });

        } catch (error) {
            reject(error)
        }
    })
}

// lấy thông tin AllCode theo 'key'
let getAllCodeByKey = (key) => {
    return new Promise(async (resolve, reject) => {
        try {
            let allCodeByKey = [];

            if (key == 'All') {
                allCodeByKey = await db.AllCode.findAll({});
            }
            else {
                allCodeByKey = await db.AllCode.findAll({
                    where: { key },
                });
            }
            resolve({
                errCode: 0,
                message: 'OK',
                data: allCodeByKey,
            });

        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getAllCode,
    getAllCodeByKey
}