import db from '../models/index';

// lấy tất cả dữ liệu trong bảng CostCode
let getCostCode = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let costList = [];
            costList = await db.CostCode.findAll({
                // where: { id: 2 },
            });
          
            if (costList) {
                resolve({
                    errCode: 0,
                    message: 'OK',
                    data: costList,
                });
            } else {
                resolve({
                    errCode: 0,
                    message: 'OK',
                    data: [],
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getCostCode,
}