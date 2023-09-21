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

let getOrderStatusByKey = (key) => {
    return new Promise(async (resolve, reject) => {
        try {

            let orders = [];
            if (orderStatus === 'All') {
                let orders[] = await db.Order.findAll({
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

module.exports = {
    getOrdersByService,
    getOrderStatusByKey
}