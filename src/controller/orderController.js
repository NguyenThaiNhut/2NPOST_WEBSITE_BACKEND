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

module.exports = {
    handleCreateNewOrder,
}