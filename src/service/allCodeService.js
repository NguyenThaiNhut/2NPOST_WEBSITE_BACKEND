import db from '../models/index';

// lấy thông tin AllCode theo 'type'

let getAllCode = (type) => {
    return new Promise(async (resolve, reject) => {
        try {
            let allCodeByType = [];

            if(type == 'All') {
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

module.exports = {
    getAllCode,
}