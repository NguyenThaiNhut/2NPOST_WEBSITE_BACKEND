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

//trung gian - lấy tất cả thông tin đơn hàng theo id đơn hàng
let handleGetAllOrderByIdCustomer = async (req, res) => {
    let id = req.query.id;
    
    let message = await orderService.getAllOrderByIdCustomer(id);
    return res.status(200).json(message)
}

module.exports = {
    handleCreateNewOrder,
    handleGetAllOrderInfo,
    handleGetAllOrderByIdCustomer,
}