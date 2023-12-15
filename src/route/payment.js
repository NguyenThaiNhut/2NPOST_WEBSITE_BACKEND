// const request = require('request');
const moment = require('moment');

var vnp_TmnCode = "PUWUWAAT";
var vnp_HashSecret = "VSTEKMGKMWZEFOBKPAFFZZKMHHHFLEJL";
var vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
var vnp_Api = "https://sandbox.vnpayment.vn/merchant_webapi/api/transaction";
var vnp_ReturnUrl = `${process.env.URL_REACT_RETURN_URL}/api/vnpay_return`; //link server + /api/vnpay_return

import orderService from '../service/orderService';

//tạo thanh toán
let handleCreateNewPayment = async (req, res, next) => {
    process.env.TZ = 'Asia/Ho_Chi_Minh';

    let date = new Date();
    let createDate = moment(date).format('YYYYMMDDHHmmss');

    let ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    let tmnCode = vnp_TmnCode;
    let secretKey = vnp_HashSecret;
    let vnpUrl = vnp_Url;
    let returnUrl = vnp_ReturnUrl;
    let orderId = req.body.orderId;
    let amount = req.body.amount;
    let bankCode = '';

    let locale = 'vn';
    if (locale === null || locale === '') {
        locale = 'vn';
    }
    let currCode = 'VND';
    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
    vnp_Params['vnp_OrderType'] = 'other';
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if (bankCode !== null && bankCode !== '') {
        vnp_Params['vnp_BankCode'] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    let querystring = require('qs');
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require("crypto");
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
    console.log(vnpUrl)
    return res.status(200).json(vnpUrl)
}

let handleGetReturn = async (req, res, next) => {
    let vnp_Params = req.query;

    let secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);

    let tmnCode = vnp_TmnCode;
    let secretKey = vnp_HashSecret;

    let querystring = require('qs');
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require("crypto");
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");

    if (secureHash === signed) {
        let responseCode = vnp_Params['vnp_ResponseCode'];
        let resultMessage = ''; // Định nghĩa thông điệp kết quả thanh toán dựa trên responseCode từ VNPAY
        let orderIdValue = vnp_Params['vnp_TxnRef']; // id của đơn hàng
        if (responseCode === '00') {
            resultMessage = 'Thanh toán thành công';

            await orderService.updateOrderPaymentStatus(orderIdValue, true, 1) // bật payment thành true, loại thanh toán 1 là chuyển khoản

            return res.render('payment_result.ejs', {
                errCode: 0,
                message: resultMessage,
                orderId: orderIdValue,
            })

        } else {
            resultMessage = 'Thanh toán thất bại';

            return res.render('payment_result.ejs', {
                errCode: 1,
                message: resultMessage,
                orderId: orderIdValue,
            })
        }
        console.log(resultMessage);
        return res.status(200).json({
            errCode: responseCode === '00' ? 0 : 1,
            message: resultMessage,
            orderId: vnp_Params['vnp_TxnRef'],
        });
    } else {
        return res.status(400).json({
            errCode: 1,
            message: 'Invalid signature'
        });
    }
};

function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}

module.exports = {
    handleCreateNewPayment,
    handleGetReturn
}