import db from '../models/index';
import { Op } from 'sequelize';
import { checkUserPhoneBykeyRole, hashUserPassword, removeFileService } from './userSevice'
import { createNewUserLocation } from './locationService'
import sequelize from 'sequelize';

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

// Tạo transporter
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
                    status: 0, // tài khoản vừa tạo có trạng thái bằng 0
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

//lấy TT transporter dựa vào id.user
let GetTransporterByIdUser = (idUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    id: idUser,
                },
                raw: true,
            })
            delete user.password;


            let transporter = await db.Transporter.findOne({
                where: {
                    id: user.idTransporter,
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

        catch (error) {
            reject(error);
        }
    })
}

//lấy weight by vehicle
let GetWeightByVehicle = (keyTypeOfVehicle) => {
    return new Promise(async (resolve, reject) => {
        try {
            let WeightOfVehicle = ''
            if (keyTypeOfVehicle === 'TOV1') {
                WeightOfVehicle = 'WEIGHT_MOTO'
            }
            else if (keyTypeOfVehicle === 'TOV2') {
                WeightOfVehicle = 'WEIGHT_PT'
            }
            else if (keyTypeOfVehicle === 'TOV3') {
                WeightOfVehicle = 'WEIGHT_T'
            }
            else {
                resolve({
                    errCode: 1,
                    message: 'Không tìm thấy phương tiện',
                    data: null,
                })
            }
            let data = await db.AllCode.findAll({
                where: { type: WeightOfVehicle },
            });
            resolve({
                errCode: 0,
                message: 'OK',
                data: data,
            })
        }

        catch (error) {
            reject(error);
        }
    })
}

// Tạo phương tiện
let CreateVehicle = (vehicleInput) => {
    return new Promise(async (resolve, reject) => {
        try {

            let checkLicensePlates = await db.Vehicle.findOne({
                where: {
                    licensePlates: vehicleInput.licensePlates,
                },
            })
            if (checkLicensePlates) {
                resolve({
                    errCode: 1,
                    message: 'Phương tiện với biển số xe này đã tồn tại!'
                })
            } else {
                let vehicleNew = await db.Vehicle.create({
                    image: vehicleInput.image,
                    type: vehicleInput.type,
                    weight: vehicleInput.weight,
                    licensePlates: vehicleInput.licensePlates,
                    description: vehicleInput.description,
                    status: vehicleInput.status,
                    idTransporter: vehicleInput.idTransporter,
                })

                if (vehicleNew) {
                    let vehicle = await db.Vehicle.findOne({
                        where: {
                            licensePlates: vehicleNew.licensePlates,
                        },
                    })

                    resolve({
                        errCode: 0,
                        message: 'OK',
                        data: vehicle,

                    })
                }
            }
        }

        catch (error) {
            reject(error);
        }
    })
}

//lấy phương tiện theo idTransporter
let GetVehicleByIdTransporter = (idTransporter) => {
    return new Promise(async (resolve, reject) => {
        try {
            let vehicles = await db.Vehicle.findAll({
                where: { idTransporter: idTransporter },
            });
            resolve({
                errCode: 0,
                message: 'OK',
                data: vehicles,
            })
        }

        catch (error) {
            reject(error);
        }
    })
}

// xóa phương tiện theo id
let deleteVehicle = async (idVehicleDel) => {
    return new Promise(async (resolve, reject) => {
        try {
            let foundVehicle = await db.Vehicle.findOne({
                where: { id: idVehicleDel }
            })

            if (foundVehicle) {
                let imageVehicle = foundVehicle.image;
                await removeFileService(imageVehicle);
                await db.Vehicle.destroy({
                    where: {
                        id: idVehicleDel
                    },
                });
                resolve({
                    errCode: 0,
                    message: 'Phương tiện đã được xóa!'
                })
            } else {
                resolve({
                    errCode: 2,
                    message: `Phương tiện không tồn tại!!!`
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}

//chỉnh sửa thông tin phương tiện vận chuyển
let editVehicle = (vehicleEdit) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('vehicleEdit', vehicleEdit)
            if (vehicleEdit.id) {
                let vehicle = await db.Vehicle.findOne({
                    where: { id: vehicleEdit.id },
                    raw: false
                });
                if (vehicle) {
                    let licensePlatesVehicle = await db.Vehicle.findOne({
                        where: {
                            licensePlates: vehicleEdit.licensePlates,
                            id: { [Op.ne]: vehicleEdit.id }
                        }
                    })
                    if (!licensePlatesVehicle) {
                        vehicle.image = vehicleEdit.image;
                        vehicle.type = vehicleEdit.type;
                        vehicle.weight = vehicleEdit.weight;
                        vehicle.description = vehicleEdit.description;
                        vehicle.status = vehicleEdit.status;
                        vehicle.licensePlates = vehicleEdit.licensePlates;
                        await vehicle.save();
                        resolve({
                            errCode: 0,
                            message: 'Sửa phương tiện thành công',
                            data: vehicle,
                        })
                    }
                    else {
                        resolve({
                            errCode: 3,
                            message: 'Biển số xe đã tồn tại',
                        })
                    }
                }
                else {
                    resolve({
                        errCode: 2,
                        message: 'Không tìm thấy phương tiện',
                    })
                }

            }
            else {
                resolve({
                    errCode: 1,
                    message: 'Vui lòng nhập thông tin',
                })
            }
        }

        catch (error) {
            reject(error);
        }
    })
}

//lấy phương tiện theo idTransporter
let GetServiceOfTransporter = (idTransporter) => {
    return new Promise(async (resolve, reject) => {
        try {
            let serviceofTrans = await db.ServiceOfTransporter.findAll({
                include: [
                    {
                        model: db.AllCode,
                        as: 'AllCode', // Đặt tên cho mối quan hệ
                    },
                ],
                where: {
                    idTransporter,
                },
                raw: false,
            });

            resolve({
                errCode: 0,
                message: 'OK',
                data: serviceofTrans,
            })
        }

        catch (error) {
            console.log(error)
            reject(error);
        }
    })
}

//lấy phạm vi theo idTransporter
let GetScopeOfTransporter = (idTransporter) => {
    return new Promise(async (resolve, reject) => {
        try {
            let scopeOfTrans = await db.ScopeOfTransporter.findAll({
                include: [
                    {
                        model: db.AllCode,
                        as: 'AllCodeScope', // Đặt tên cho mối quan hệ
                    },
                ],
                where: {
                    idTransporter,
                },
                raw: false,
            });

            resolve({
                errCode: 0,
                message: 'OK',
                data: scopeOfTrans,
            })
        }

        catch (error) {
            console.log(error)
            reject(error);
        }
    })
}

//chỉnh sửa thông tin nhà vận chuyển
// let editInfoTrans = (transporterEdit) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             console.log('transporterEdit', transporterEdit)
//             if (transporterEdit.id) {
//                 let user = await db.User.findOne({
//                     where: { id: data.id },
//                     raw: false,
//                 })
//                 if (user) {
//                     user.email = transporterEdit.email;
//                     user.address = transporterEdit.address;
//                     await user.save();
//                     // resolve({
//                     //     errCode: 0,
//                     //     message: 'Thông tin người dùng đã được cập nhật!'
//                     // })
//                     let user = await db.User.findOne({
//                         where: { id: data.id },
//                         raw: false,
//                     })
//                 } else {
//                     resolve({
//                         errCode: 1,
//                         message: `Người dùng không tồn tại!!!`
//                     })
//                 }
//             } else {
//                 resolve({
//                     errCode: 2,
//                     message: 'Vui lòng nhập thông tin!!!'
//                 })
//             }
//         }

//         catch (error) {
//             reject(error);
//         }
//     })
// }

module.exports = {
    getOrdersByService,
    getOrderStatusByKey,
    CreateAccountTransporter,
    GetTransporterByIdUser,
    GetWeightByVehicle,
    CreateVehicle,
    GetVehicleByIdTransporter,
    deleteVehicle,
    editVehicle,
    GetServiceOfTransporter,
    GetScopeOfTransporter,
    // editInfoTrans
}