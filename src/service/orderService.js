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

//lấy loại hàng hóa theo id đơn hàng, (dễ vỡ, quá tải,...)
let getTypeOfGoodsByOrder = (idOrder) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkOrder = await checkOrderExists(idOrder);
            if(checkOrder){
                let typeOfGoods = await db.TypeOfGoodsByOrder.findAll({
                    where: { idOrder: idOrder },
                })
                if(typeOfGoods){
                    resolve({
                        errCode: 0,
                        message: `Lấy tất cả loại hàng hóa theo đơn hàng thành công!!!`,
                        data: typeOfGoods,
                    })
                } else {
                    resolve({
                        errCode: 0,
                        message: `Lấy tất cả loại hàng hóa theo đơn hàng thành công!!!`,
                        data: [],
                    })
                }
            } else {
                resolve({
                    errCode: 1,
                    message: `Đơn hàng không tồn tại!!!`,
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

// kiểm tra id người dùng có tồn tại trong database hay chưa,
let checkUserExists = (idUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: idUser },
            })
            if(user){
                resolve(true)
            } else {
                resolve(false)
            }
            
        } catch (error) {
            reject(error);
        }
    });
} 

//lấy thông tin đơn hàng theo id đơn hàng - (chưa code xong)
let getAllOrderInfoByIdOrder = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let order = await db.Order.findOne({
                where: { id: 3 },
                include: [
                    {
                        model: db.User, // thông tin khách hàng
                        as: 'User', // Đặt tên cho mối quan hệ
                    },
                    {
                        model: db.AllCode, // dịch vụ của đơn hàng
                        as: 'keyServiceAllCode', // Đặt tên cho mối quan hệ
                    },
                    {
                        model: db.AllCode, // trạng thái của đơn hàng
                        as: 'keyOrderStatusAllCode', // Đặt tên cho mối quan hệ
                    }
                ],
                raw: false,
            })
            
            if(order){
                let typeOfGoods = await getTypeOfGoodsByOrder(3);
                console.log('check: ', typeOfGoods);
                if(typeOfGoods.errCode == 0){
                    if(typeOfGoods.data.length > 0){
                        order.setDataValue('typeOfGoods', typeOfGoods.data);
                    } else {
                        order.setDataValue('typeOfGoods', []);
                    }
                }
                
                
                resolve({
                    errCode: 0,
                    message: `Lấy thông tin đơn hàng thành công!!!`,
                    data: order,
                })
                
            }
        } catch (error) {
            reject(error);
        }
    })
}

//tạo mới đơn hàng người dùng vào database
let createNewOrder = (orderInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkedUser = await checkUserExists(orderInput.idCustomer);
            if (checkedUser) {
                let order = await db.Order.create({
                    idCustomer: orderInput.idCustomer,
                    image: orderInput.image,
                    senderName: orderInput.senderName,
                    senderPhone: orderInput.senderPhone,
                    senderAddress: orderInput.senderAddress,
                    recieverName: orderInput.recieverName,
                    recieverPhone: orderInput.recieverPhone,
                    recieverAddress: orderInput.recieverAddress,
                    typeOrder: orderInput.typeOrder, // loại "0": hệ thống tự động gợi ý nhà vận chuyển , loại "1" tự lựa chọn nhà vận chuyển
                    idTransporter: orderInput.idTransporter,
                    keyService: orderInput.keyService,
                    idSenderLocation: orderInput.idSenderLocation,
                    recieverLngLocation: orderInput.recieverLngLocation,
                    recieverLatLocation: orderInput.recieverLatLocation,
                    keyOrderStatus: orderInput.keyOrderStatus,
                    totalCost: orderInput.totalCost,
                })

                console.log('thong tin don hang da duoc tao: ', order);

                resolve({
                    errCode: 0,
                    message: 'Tạo đơn hàng thành công',
                    data: order,
                })
            } else {
                resolve({
                    errCode: 1,
                    message: 'Người dùng không được tìm thấy!!!',
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    createNewOrder,
}