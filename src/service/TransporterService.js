import db from '../models/index';
import { checkUserPhoneBykeyRole, hashUserPassword } from './userSevice'
import Sequelize from 'sequelize';
import { Utils } from 'sequelize';

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

// lấy bảng allcode theo Key - và khi key=All thì nó trả về trạng thái đơn hàng
let getOrderStatusByKey = (key) => {
    return new Promise(async (resolve, reject) => {
        try {
            let orders = [];
            if (key === 'All') {
                orders = await db.AllCode.findAll({
                    where: {
                        type: ['ORDER_STATUS', 'TRANSPORT_STATUS'],
                    },
                    raw: true,
                })
            }

            else {
                orders = await db.AllCode.findOne({
                    where: { key: key },
                    raw: true,
                })
            }
            resolve(orders);

        }
        catch (error) {
            reject(error);
        }
    })
}

let CreateAccountTransporter = (transporterInput, userInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserPhoneBykeyRole(userInput.phone, userInput.keyRole);
            if (check) {
                resolve({
                    errCode: 1,
                    message: 'Số điện thoại đã tồn tại, vui lòng nhập số điện thoại khác!!!'
                })
            } else {
                let transporterNew = await db.Transporter.create({
                    transporterName: transporterInput.transporterName,
                    foundingDate: transporterInput.foundingDate,
                })

                if (transporterNew) {
                    let hashPasswordFromBcrypt = await hashUserPassword(userInput.password)
                    await db.User.create({
                        userName: userInput.userName,
                        birthday: userInput.birthday,
                        keyGender: userInput.keyGender,
                        address: userInput.address,
                        idDefaultLocation: userInput.idDefaultLocation,
                        // image
                        email: userInput.email,
                        password: hashPasswordFromBcrypt,
                        phone: userInput.phone,
                        status: userInput.status,
                        keyRole: userInput.keyRole,
                        idTransporter: transporterNew.id,
                    })

                    let user = await db.User.findOne({
                        where: {
                            phone: userInput.phone,
                            idTransporter: transporterNew.id, // Điều kiện để lọc các phần tử của bảng A
                        },
                        raw: true,
                    })
                    delete user.password;


                    let transporter = await db.Transporter.findOne({
                        where: {
                            id: transporterNew.id, // Điều kiện để lọc các phần tử của bảng A
                        },
                        raw: true,
                    })

                    delete transporter.id;

                    resolve({
                        errCode: 0,
                        message: 'OK',
                        data: { user, transporter },

                    })
                }
            }
        }

        catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    getOrdersByService,
    getOrderStatusByKey,
    CreateAccountTransporter
}