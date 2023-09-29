import db from '../models/index';

// lấy tất cả đơn hàng theo trạng thái(order-status) của NVC(idTransporter);
let getOrdersByService = (orderStatus, idTransporter) => {
    return new Promise(async (resolve, reject) => {
        try {

            let orders = [];
            if (orderStatus === 'All') {
                orders = await db.Order.findAll({
                    where: { idTransporter: idTransporter },
                    raw: true,
                })
            }

            else {
                orders = await db.Order.findAll({
                    where: { keyOrderStatus: orderStatus, idTransporter: idTransporter },
                    raw: true,
                })
            }
            console.log(orders)
            resolve(orders);

        }
        catch (error) {
            reject(error);
        }
    })

}

// lấy bảng allcode theo Key - và khi key=All thì nó trả về trạng thái đơn hàng
let getOrderStatusByKey = (key) => {
    return new Promise(async (resolve, reject) => {
        try {
            let orders = [];
            if (key === 'All') {
                orders = await db.AllCode.findAll({
                    where: {
                        type: ['ORDER_STATUS', 'TRANSPORT_STATUS'],
                    },
                    raw: true,
                })
            }

            else {
                orders = await db.AllCode.findOne({
                    where: { key: key },
                    raw: true,
                })
            }
            resolve(orders);

        }
        catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    getOrdersByService,
    getOrderStatusByKey
}