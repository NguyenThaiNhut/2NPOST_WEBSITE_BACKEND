import typeOfGoodsService from '../service/typeOfGoodsService';

//tạo mới sản phẩm theo đơn hàng
let handleCreateNewTypeOfGoods = async (req, res) => {
    let typeOfGoodsInput = req.body;
    console.log(typeOfGoodsInput);
    
    let message = await typeOfGoodsService.createNewTypeOfGoods(typeOfGoodsInput);
    return res.status(200).json(message)

    // let message = await orderService.createNewOrder();
    // return res.status(200).json(message)
}


module.exports = {
    handleCreateNewTypeOfGoods,
}