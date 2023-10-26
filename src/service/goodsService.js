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
let createNewGoods = (goodsInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(goodsInput.idOrder){
                let checkedOrder = await checkOrderExists(goodsInput.idOrder);
                if (checkedOrder) {
                    let goods = await db.Goods.create({
                        name: goodsInput.name,
                        weight: goodsInput.weight,
                        value: goodsInput.value,
                        quantity: goodsInput.quantity,
                        idOrder: goodsInput.idOrder,
                    })

                    console.log('thong tin don hang da duoc tao: ', goods);

                    resolve({
                        errCode: 0,
                        message: 'Tạo hàng hóa theo đơn hàng thành công',
                        data: goods,
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
    createNewGoods,
}