import db from '../models/index';

//kiểm tra đơn hàng (order) có tồn tại hay không, nếu tồn tại trả về true, ngược lại false
let checkOrderExists = (idOrder) => {
    return new Promise(async (resolve, reject) => {
        try {
            let order = await db.Order.findOne({
                where: { id: idOrder },
            })
            if(order){
                resolve(true)
            } else {
                resolve(false)
            }
            
        } catch (error) {
            reject(error);
        }
    })
}

//tạo mới sản phẩm theo id đơn hàng vào database
let createNewTypeOfGoods = (typeOfGoodsInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(typeOfGoodsInput.idOrder){
                let checkedOrder = await checkOrderExists(typeOfGoodsInput.idOrder);
                if (checkedOrder) {
                    let typeOfGoods = await db.TypeOfGoodsByOrder.create({
                        idOrder: typeOfGoodsInput.idOrder,
                        keyTypeOfGoods: typeOfGoodsInput.keyTypeOfGoods,
                    })

                    console.log('thong tin tính chất hàng hóa đã được tạo: ', typeOfGoods);

                    resolve({
                        errCode: 0,
                        message: 'Tạo tính chất hàng hóa theo đơn hàng thành công',
                        data: typeOfGoods,
                    })
                } else {
                    resolve({
                        errCode: 2,
                        message: 'Đơn hàng không được tìm thấy!!!',
                    })
                }
            } else {
                resolve({
                    errCode: 1,
                    message: 'Vui lòng nhập vào id đơn hàng!!!',
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}


module.exports = {
    createNewTypeOfGoods,
}