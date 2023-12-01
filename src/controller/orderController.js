import orderService from '../service/orderService';


//tạo mới đơn hàng theo người dùng
let handleCreateNewOrder = async (req, res) => {
    let orderInput = req.body;
    console.log(orderInput);

    let message = await orderService.createNewOrder(orderInput);
    return res.status(200).json(message)

    // let message = await orderService.createNewOrder();
    // return res.status(200).json(message)
}

//trung gian - lấy tất cả thông tin đơn hàng theo id đơn hàng
let handleGetAllOrderInfo = async (req, res) => {
    let id = req.query.id;

    let message = await orderService.getAllOrderInfoByIdOrder(id);
    return res.status(200).json(message)
}

//trung gian - lấy tất cả đơn hàng theo id người dùng và trạng thái đơn hàng
let handleGetAllOrderByIdCustomer = async (req, res) => {
    let id = req.query.id;
    let keyOrderStatus = req.query.keyOrderStatus;

    console.log('check', id, keyOrderStatus)

    let message = await orderService.getAllOrderByIdCustomer(id, keyOrderStatus);
    return res.status(200).json(message)
}

//cập nhật trnagj thái đơn hàng 
let handleUpdateKeyOrderStatus = async (req, res) => {
    let idOrder = req.body.id;
    let keyOrderStatus = req.body.keyOrderStatus;

    let message = await orderService.updateKeyOrderStatus(idOrder, keyOrderStatus);
    return res.status(200).json(message)
}

//cập nhật trnagj thái thanh toán của đơn hàng 
let handleUpdateOrderPaymentStatus = async (req, res) => {
    let idOrder = req.body.id;
    let payment = req.body.payment;
    let typePayment = req.body.typePayment;

    let message = await orderService.updateOrderPaymentStatus(idOrder, payment, typePayment);
    return res.status(200).json(message)
}

// Thêm tài xế cho đơn hàng
let handleCreateDriverForOrder = async (req, res) => {
    let idOrder = req.body.idOrder;
    let idDriver = req.body.idDriver;
    if (!idOrder || !idDriver) {
        return res.status(200).json({
            errCode: 2,
            message: 'Mời nhập đủ thông tin',
        })
    }
    let message = await orderService.CreateDriverForOrder(idOrder, idDriver);
    return res.status(200).json(message)

}

// Thêm phương tiện cho đơn hàng
let handleCreateVehicleForOrder = async (req, res) => {
    let idOrder = req.body.idOrder;
    let idVehicle = req.body.idVehicle;
    if (!idOrder || !idVehicle) {
        return res.status(200).json({
            errCode: 2,
            message: 'Mời nhập đủ thông tin',
        })
    }
    let message = await orderService.CreateVehicleForOrder(idOrder, idVehicle);
    return res.status(200).json(message)
}

// Thêm transportation cho đơn hàng
let handleCreateTransportationOrder = async (req, res) => {
    let idOrder = req.body.idOrder;
    if (!idOrder) {
        return res.status(200).json({
            errCode: 2,
            message: 'Mời nhập đủ thông tin',
        })
    }
    let message = await orderService.CreateTransportationOrder(idOrder);
    return res.status(200).json(message)
}
module.exports = {
    handleCreateNewOrder,
    handleGetAllOrderInfo,
    handleGetAllOrderByIdCustomer,
    handleUpdateKeyOrderStatus,
    handleCreateDriverForOrder,
    handleCreateVehicleForOrder,
    handleCreateTransportationOrder,
    handleUpdateOrderPaymentStatus,
}