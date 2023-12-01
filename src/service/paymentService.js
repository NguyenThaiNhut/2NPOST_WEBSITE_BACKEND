
import crypto from 'crypto';
const queryString = require('querystring');
import axios from 'axios';
//tạo thanh toán
let CreateNewPayment = (amount, orderInfo, returnUrl) => {
    return new Promise(async (resolve, reject) => {
        try {

            // Thông tin của tài khoản VNPAY
            const vnp_Url = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
            const vnp_TmnCode = 'PUWUWAAT';
            const vnp_HashSecret = 'VSTEKMGKMWZEFOBKPAFFZZKMHHHFLEJL';

            // Tạo dữ liệu yêu cầu thanh toán
            const data = {
                vnp_Version: '2',
                vnp_Command: 'pay',
                vnp_TmnCode: vnp_TmnCode,
                vnp_Amount: amount * 100, // Số tiền cần thanh toán (đơn vị: VNĐ)
                vnp_CurrCode: 'VND',
                vnp_OrderInfo: orderInfo,
                vnp_ReturnUrl: returnUrl,
            };

            // Sắp xếp dữ liệu theo thứ tự từ điển
            const sortedData = Object.keys(data)
                .sort()
                .reduce((acc, key) => {
                    acc[key] = data[key];
                    return acc;
                }, {});

            // Tạo chuỗi query string
            const query = queryString.stringify(sortedData);

            // Tạo mã hash từ chuỗi dữ liệu
            const hmac = crypto.createHmac('sha512', vnp_HashSecret);
            hmac.update(query);
            const hash = hmac.digest('hex');

            // Thêm mã hash vào dữ liệu yêu cầu thanh toán
            data['vnp_SecureHashType'] = 'SHA512';
            data['vnp_SecureHash'] = hash.toUpperCase();

            // Chuyển hướng người dùng đến trang thanh toán của VNPAY
            const redirectUrl = `${vnp_Url}?${queryString.stringify(data)}`;

            // Trả về URL để chuyển hướng người dùng đến trang thanh toán của VNPAY
            resolve({
                errCode: 0,
                message: redirectUrl,
            })
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    CreateNewPayment,
}