import goodsService from '../service/goodsService';

//tạo mới sản phẩm theo đơn hàng
let handleCreateNewGoods = async (req, res) => {
    let goodsInput = req.body;
    console.log(goodsInput);
    
    let message = await goodsService.createNewGoods(goodsInput);
    return res.status(200).json(message)

    // let message = await orderService.createNewOrder();
    // return res.status(200).json(message)
}


module.exports = {
    handleCreateNewGoods,
}