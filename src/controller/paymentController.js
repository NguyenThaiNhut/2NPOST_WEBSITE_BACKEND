import paymentService from "../service/paymentService";

//tạo thanh toán
let handleCreateNewPayment = async (req, res) => {
    const { amount, orderInfo, returnUrl } = req.body; // số tiền, id đơn hàng, trang trả về sau khi thanh toán

    if (!amount || !orderInfo || !returnUrl) {
        return res.status(200).json({
            errCode: 1,
            message: 'Vui lòng nhập thông tin!!!'
        })
    }

    let message = await paymentService.CreateNewPayment(amount, orderInfo, returnUrl);

    return res.status(200).json(message)
}

module.exports = {
    handleCreateNewPayment
}