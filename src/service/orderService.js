import db from '../models/index';
import { Op } from 'sequelize';

//kiểm tra đơn hàng (order) có tồn tại hay không, nếu tồn tại trả về true, ngược lại false
let checkOrderExists = (idOrder) => {
    return new Promise(async (resolve, reject) => {
        try {
            let order = await db.Order.findOne({
                where: { id: idOrder },
            })
            if (order) {
                resolve(true)
            } else {
                resolve(false)
            }

        } catch (error) {
            reject(error);
        }
    })
}

//lấy loại hàng hóa theo id đơn hàng, (dễ vỡ, quá tải,...)
let getTypeOfGoodsByOrder = (idOrder) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkOrder = await checkOrderExists(idOrder);
            if (checkOrder) {
                let typeOfGoods = await db.TypeOfGoodsByOrder.findAll({
                    where: { idOrder: idOrder },
                    include: [
                        {
                            model: db.AllCode, // dịch vụ của đơn hàng
                            as: 'keyTypeOfGoodsAllCode', // Đặt tên cho mối quan hệ
                        },
                    ],
                    raw: false
                })
                if (typeOfGoods) {
                    resolve({
                        errCode: 0,
                        message: `Lấy tất cả loại hàng hóa theo đơn hàng thành công!!!`,
                        data: typeOfGoods,
                    })
                } else {
                    resolve({
                        errCode: 0,
                        message: `Lấy tất cả loại hàng hóa theo đơn hàng thành công!!!`,
                        data: [],
                    })
                }
            } else {
                resolve({
                    errCode: 1,
                    message: `Đơn hàng không tồn tại!!!`,
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}


//lấy hàng hóa theo id đơn hàng, (laptop, điện thoại, bàn ghế, tủ lạnh,...)
let getGoodsByOrder = (idOrder) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkOrder = await checkOrderExists(idOrder);
            if (checkOrder) {
                let goods = await db.Goods.findAll({
                    where: { idOrder: idOrder },
                    // include: [
                    //     {
                    //         model: db.AllCode, // dịch vụ của đơn hàng
                    //         as: 'keyTypeOfGoodsAllCode', // Đặt tên cho mối quan hệ
                    //     },
                    // ],
                    // raw: false
                })
                if (goods) {
                    resolve({
                        errCode: 0,
                        message: `Lấy tất cả hàng hóa theo đơn hàng thành công!!!`,
                        data: goods,
                    })
                } else {
                    resolve({
                        errCode: 0,
                        message: `Lấy tất cả hàng hóa theo đơn hàng thành công!!!`,
                        data: [],
                    })
                }
            } else {
                resolve({
                    errCode: 1,
                    message: `Đơn hàng không tồn tại!!!`,
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

// kiểm tra id người dùng có tồn tại trong database hay chưa,
let checkUserExists = (idUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: idUser },
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }

        } catch (error) {
            reject(error);
        }
    });
}

// kiểm tra key của 2 bảng trạng thái đơn hàng & trạng thái vận chuyển có tồn tại trong database hay chưa,
let checkKeyOrderStatusExists = (keyOrderStatus) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('checkkkk: ', keyOrderStatus);
            let orderStatus = await db.AllCode.findAll({
                where: {
                    type: ["ORDER_STATUS", "TRANSPORT_STATUS"],
                    key: keyOrderStatus,
                },
            })
            console.log('checkkkkkk: ', orderStatus);
            if (orderStatus) {
                resolve(true)
            } else {
                resolve(false)
            }

        } catch (error) {
            reject(error);
        }
    });
}

//lấy thông tin đơn hàng theo id đơn hàng
let getAllOrderInfoByIdOrder = (idOrder) => {
    return new Promise(async (resolve, reject) => {
        try {
            let order = await db.Order.findOne({
                where: { id: idOrder },
                include: [
                    {
                        model: db.User, // thông tin khách hàng
                        as: 'user', // Đặt tên cho mối quan hệ
                        attributes: { exclude: ['password'] }
                    },
                    {
                        model: db.AllCode, // dịch vụ của đơn hàng
                        as: 'keyServiceAllCode', // Đặt tên cho mối quan hệ
                    },
                    {
                        model: db.AllCode, // trạng thái của đơn hàng
                        as: 'keyOrderStatusAllCode', // Đặt tên cho mối quan hệ
                    },
                    {
                        model: db.UserLocation, // tọa độ người gửi
                        as: 'senderLocation', // Đặt tên cho mối quan hệ
                    },
                    {
                        model: db.Transportation, // thông tin transportation
                        as: 'transportationOrder', // Đặt tên cho mối quan hệ
                    },
                ],
                raw: false,
            })

            if (order) {
                let typeOfGoods = await getTypeOfGoodsByOrder(idOrder);
                console.log('check: ', typeOfGoods);
                if (typeOfGoods.errCode == 0) {
                    if (typeOfGoods.data.length > 0) {
                        order.setDataValue('typeOfGoods', typeOfGoods.data);
                    } else {
                        order.setDataValue('typeOfGoods', []);
                    }
                }

                let goods = await getGoodsByOrder(idOrder);
                console.log('check: ', goods);
                if (goods.errCode == 0) {
                    if (goods.data.length > 0) {
                        order.setDataValue('goods', goods.data);
                    } else {
                        order.setDataValue('goods', []);
                    }
                }


                resolve({
                    errCode: 0,
                    message: `Lấy thông tin đơn hàng thành công!!!`,
                    data: order,
                })

            } else {
                resolve({
                    errCode: 1,
                    message: `Đơn hàng không tồn tại!!!`,
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

//tạo mới đơn hàng người dùng vào database
let createNewOrder = (orderInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkedUser = await checkUserExists(orderInput.idCustomer);
            if (checkedUser) {
                let order = await db.Order.create({
                    idCustomer: orderInput.idCustomer,
                    image: orderInput.image,
                    senderName: orderInput.senderName,
                    senderPhone: orderInput.senderPhone,
                    senderAddress: orderInput.senderAddress,
                    recieverName: orderInput.recieverName,
                    recieverPhone: orderInput.recieverPhone,
                    recieverAddress: orderInput.recieverAddress,
                    typeOrder: orderInput.typeOrder, // loại "0": hệ thống tự động gợi ý nhà vận chuyển , loại "1" tự lựa chọn nhà vận chuyển
                    idTransporter: orderInput.idTransporter,
                    keyService: orderInput.keyService,
                    idSenderLocation: orderInput.idSenderLocation,
                    recieverLngLocation: orderInput.recieverLngLocation,
                    recieverLatLocation: orderInput.recieverLatLocation,
                    keyOrderStatus: orderInput.keyOrderStatus,
                    totalCost: orderInput.totalCost,
                    note: orderInput.note,
                })

                console.log('thong tin don hang da duoc tao: ', order);

                resolve({
                    errCode: 0,
                    message: 'Tạo đơn hàng thành công',
                    data: order,
                })
            } else {
                resolve({
                    errCode: 1,
                    message: 'Người dùng không được tìm thấy!!!',
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

//lấy tất cả đơn hàng theo id của khách hàng và trạng thái đơn hàng (nếu có)
let getAllOrderByIdCustomer = (idUser, keyOrderStatus) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkUserExistsValue = await checkUserExists(idUser);

            if (checkUserExistsValue) {
                if (keyOrderStatus == 'ALL') {
                    let orderList = await db.Order.findAll({
                        where: {
                            idCustomer: idUser,
                        },
                    })

                    if (orderList && orderList.length > 0) {
                        resolve({
                            errCode: 0,
                            message: `Lấy tất cả đơn hàng theo ID khách hàng thành công!!!`,
                            data: orderList,
                        })
                    } else {
                        resolve({
                            errCode: 2,
                            message: `Danh sách đơn hàng rỗng!!!`,
                        })
                    }
                } else if(keyOrderStatus == 'DRIVER_ORDER'){
                    // lấy tất cả đơn hàng dành cho tài xế đó (tất cả trạng thái vận chuyển)
                    // ngoại trừ TS4 (đã giao thành công)
                    let orderListOfDriver = await db.Transportation.findAll({
                        where: {
                            idDriver: idUser,
                            // keyTransportStatus: ["TS0", "TS1", "TS2", "TS3"],
                        },
                        include: [
                            {
                                model: db.Order, // dịch vụ của đơn hàng
                                as: 'orderTransportation', // Đặt tên cho mối quan hệ
                            },
                        ],
                        raw: false
                    })

                    if(orderListOfDriver.length > 0){
                        var orderTransportationStatus = ['TS0', 'TS1', 'TS2', 'TS3'];

                        orderListOfDriver = orderListOfDriver.filter((item, index) => {
                            let key = item.orderTransportation.keyOrderStatus;
                            console.log(key);
                            return orderTransportationStatus.includes(key);
                        })
                    }

                    if (orderListOfDriver && orderListOfDriver.length > 0) {
                        resolve({
                            errCode: 0,
                            message: `Lấy tất cả đơn hàng theo ID tài xế thành công!!!`,
                            data: orderListOfDriver,
                        })
                    } else {
                        resolve({
                            errCode: 2,
                            message: `Danh sách đơn hàng rỗng!!!`,
                        })
                    }

                } else if(keyOrderStatus == 'DRIVER_HISTORY'){
                    // lấy tất cả đơn hàng dành cho tài xế đó (tất cả trạng thái vận chuyển)
                    // ngoại trừ TS4 (đã giao thành công)
                    let orderListOfDriver = await db.Transportation.findAll({
                        where: {
                            idDriver: idUser,
                            // keyTransportStatus: ["TS0", "TS1", "TS2", "TS3"],
                        },
                        include: [
                            {
                                model: db.Order, // dịch vụ của đơn hàng
                                as: 'orderTransportation', // Đặt tên cho mối quan hệ
                            },
                        ],
                        raw: false
                    })

                    if(orderListOfDriver.length > 0){
                        var orderTransportationStatus = ['TS4', 'TS5'];

                        orderListOfDriver = orderListOfDriver.filter((item, index) => {
                            let key = item.orderTransportation.keyOrderStatus;
                            console.log(key);
                            return orderTransportationStatus.includes(key);
                        })
                    }

                    if (orderListOfDriver && orderListOfDriver.length > 0) {
                        resolve({
                            errCode: 0,
                            message: `Lấy tất cả đơn hàng theo ID tài xế thành công!!!`,
                            data: orderListOfDriver,
                        })
                    } else {
                        resolve({
                            errCode: 2,
                            message: `Danh sách đơn hàng rỗng!!!`,
                        })
                    }

                } else {
                    //kiểm tra xem key order status có tồn tại hay không?
                    let checkKeyOrderStatusExistsValue = await checkKeyOrderStatusExists(keyOrderStatus);
                    console.log('check checkKeyOrderStatusExistsValue: ', checkKeyOrderStatusExistsValue);
                    if (checkKeyOrderStatusExistsValue) {

                        let orderList = [];
                        if(keyOrderStatus == 'OS1'){
                            orderList = await db.Order.findAll({
                                where: {
                                    idCustomer: idUser,
                                    keyOrderStatus: ["TS0", "TS1", "TS2", "TS3"],
                                },
                                include: [
                                    {
                                        model: db.Transportation, // dịch vụ của đơn hàng
                                        as: 'transportationOrder', // Đặt tên cho mối quan hệ
                                    },
                                ],
                                raw: false
                            })
                        } else if(keyOrderStatus == 'TS4'){
                            orderList = await db.Order.findAll({
                                where: {
                                    idCustomer: idUser,
                                    keyOrderStatus: ["TS4", "TS5"],
                                },
                            })
                        } else {
                            orderList = await db.Order.findAll({
                                where: {
                                    idCustomer: idUser,
                                    keyOrderStatus: keyOrderStatus,
                                },
                            })
                        }
                        

                        if (orderList && orderList.length > 0) {
                            resolve({
                                errCode: 0,
                                message: `Lấy tất cả đơn hàng theo ID khách hàng và trạng thái đơn hàng thành công!!!`,
                                data: orderList,
                            })
                        } else {
                            resolve({
                                errCode: 2,
                                message: `Danh sách đơn hàng rỗng!!!`,
                            })
                        }
                    } else {
                        resolve({
                            errCode: 3,
                            message: `Không tìm thấy key của trạng thái đơn hàng!!!`,
                        })
                    }
                }
            } else {
                resolve({
                    errCode: 1,
                    message: `Người dùng không tồn tại!!!`,
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

// cập nhật trạng thái đơn hàng ()
let updateKeyOrderStatus = (idOrder, keyStatus) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkOrderExistsValue = await checkOrderExists(idOrder);

            if (checkOrderExistsValue) {
                if (keyStatus) {
                    let order = await db.Order.findOne({
                        where: { id: idOrder },
                        raw: false,
                    })
                    if (order) {
                        order.keyOrderStatus = keyStatus;

                        await order.save();

                        resolve({
                            errCode: 0,
                            message: 'Trạng thái đơn hàng đã được cập nhật!'
                        })
                    } else {
                        resolve({
                            errCode: 3,
                            message: `Đơn hàng không tồn tại!!!`
                        })
                    }
                } else {
                    resolve({
                        errCode: 2,
                        message: `Vui lòng nhập trạng thái đơn hàng!!!`,
                    })
                }
            } else {
                resolve({
                    errCode: 1,
                    message: `Người dùng không tồn tại!!!`,
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}


// cập nhật trạng thái thanh toán cho đơn hàng
let updateOrderPaymentStatus = (idOrder, payment, typePayment) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkOrderExistsValue = await checkOrderExists(idOrder);

            if (checkOrderExistsValue) {
                let transportation = await db.Transportation.findOne({
                    where: { idOrder: idOrder },
                    raw: false,
                })
                if (transportation) {
                    transportation.payment = payment;
                    transportation.typePayment = typePayment;

                    await transportation.save();

                    resolve({
                        errCode: 0,
                        message: 'Trạng thái thanh toán của đơn hàng đã được cập nhật!'
                    })
                } else {
                    resolve({
                        errCode: 3,
                        message: `Đơn hàng vận chuyển không tồn tại!!!`
                    })
                }
            } else {
                resolve({
                    errCode: 1,
                    message: `Người dùng không tồn tại!!!`,
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

//thêm tài xế cho đơn hàng
let CreateDriverForOrder = (idOrder, idDriver) => {
    return new Promise(async (resolve, reject) => {
        try {
            let order = await db.Transportation.findOne({
                where: {
                    idOrder,
                },
                raw: false,
            })
            // sửa
            if (order) {
                order.idDriver = idDriver;
                await order.save();
                resolve({
                    errCode: 0,
                    message: 'Chỉnh sửa tài xế cho đơn hàng thành công',
                })
            }
            // Thêm
            else {
                let transportation = await db.Transportation.create({
                    idOrder: idOrder,
                    idDriver: idDriver,
                    payment: false, // thiết lập mặc định là false, chưa thanh toán
                    keyTransportStatus: 'TS0', // thiết lập mặc định là chờ lấy hàng

                })
                if (transportation) {
                    resolve({
                        errCode: 0,
                        message: 'Thêm tài xế vào đơn hàng thành công',
                        data: transportation
                    })
                }
            }
        } catch (error) {
            reject(error);
        }
    })
}


//thêm phương tiện cho đơn hàng
let CreateVehicleForOrder = (idOrder, idVehicle) => {
    return new Promise(async (resolve, reject) => {
        try {
            let order = await db.Transportation.findOne({
                where: {
                    idOrder,
                },
                raw: false,
            })
            // sửa
            if (order) {
                order.idVehicle = idVehicle;
                await order.save();
                resolve({
                    errCode: 0,
                    message: 'Chỉnh sửa phương tiện cho đơn hàng thành công',
                })
            }
            // Thêm
            else {
                let transportation = await db.Transportation.create({
                    idOrder: idOrder,
                    idVehicle: idVehicle,
                    payment: false, // thiết lập mặc định là false, chưa thanh toán
                    keyTransportStatus: 'TS0', // thiết lập mặc định là chờ lấy hàng
                })
                if (transportation) {
                    resolve({
                        errCode: 0,
                        message: 'Thêm phương tiện vào đơn hàng thành công',
                        data: transportation
                    })
                }
            }
        } catch (error) {
            reject(error);
        }
    })
}

//Thêm transportation cho đơn hàng
let CreateTransportationOrder = (idOrder) => {
    return new Promise(async (resolve, reject) => {
        try {
            let order = await db.Transportation.findOne({
                where: {
                    idOrder,
                },
                raw: false,
            })
            // sửa
            if (order) {
                resolve({
                    errCode: 0,
                    message: 'Đơn hàng đã tồn tại trong transportation',
                })
            }
            // Thêm
            else {
                let transportation = await db.Transportation.create({
                    idOrder: idOrder,
                    payment: false, // thiết lập mặc định là false, chưa thanh toán
                    keyTransportStatus: 'TS0', // thiết lập mặc định là chờ lấy hàng
                })
                if (transportation) {
                    resolve({
                        errCode: 0,
                        message: 'Đơn hàng đã được thêm thành công vào transportation',
                        data: transportation
                    })
                }
            }
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    createNewOrder,
    getAllOrderInfoByIdOrder,
    getAllOrderByIdCustomer,
    updateKeyOrderStatus,
    CreateDriverForOrder,
    CreateVehicleForOrder,
    CreateTransportationOrder,
    updateOrderPaymentStatus,
}