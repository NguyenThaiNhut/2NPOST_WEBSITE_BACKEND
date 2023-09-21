import TransporterService from '../service/TransporterService';

// lấy tất cả đơn hàng theo trạng thái(order-status) của NVC(idTransporter);
let handleGetOrdersByService = async (req, res) => {
    let orderStatus = req.query.keyOrderStatus;
    let idTransporter = req.query.idTransporter;
    console.log(req.body)
    try {
        let message = await TransporterService.getOrdersByService(orderStatus, idTransporter);
        return res.status(200).json(message)

    }
    catch (error) {
        return res.status(500).json({
            error: 1,
            message: 'Missing required params'
        })

    }

}

let handleGetOrderStatusByKey = async (req, res) => {
    let key = req.query.key;
    try {
        let message = await TransporterService.getOrderStatusByKey(key);
        return res.status(200).json(message)
    }
    catch (error) {
        return res.status(500).json({
            error: 1,
            message: 'Missing required params'
        })

    }

}

module.exports = {
    handleGetOrdersByService,
    handleGetOrderStatusByKey
}