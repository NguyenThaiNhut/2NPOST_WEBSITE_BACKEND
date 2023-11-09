import db, { sequelize } from '../models/index';
import { Op } from 'sequelize';
import { checkUserPhoneBykeyRole, hashUserPassword, removeFileService } from './userSevice';
import { getAllOrderInfoByIdOrder } from './orderService'

// lấy tất cả đơn hàng theo trạng thái(order-status) của NVC(idTransporter);
let getOrdersByService = (orderStatus, idTransporter) => {
    return new Promise(async (resolve, reject) => {
        try {
            let orders = [];
            if (orderStatus === 'All') {
                let ordersByIdTransporter = await db.Order.findAll({
                    where: { idTransporter },
                    raw: false,
                })
                console.log('17', ordersByIdTransporter)
                if (ordersByIdTransporter) {
                    for (const or of ordersByIdTransporter) {
                        let order = await getAllOrderInfoByIdOrder(or.id);
                        if (order) {
                            orders.push(order.data);
                        }
                    }
                }
            }

            else {
                let ordersByIdTransporter = await db.Order.findAll({
                    where: { idTransporter: idTransporter, keyOrderStatus: orderStatus },
                    raw: false,
                })
                if (ordersByIdTransporter) {
                    for (const or of ordersByIdTransporter) {
                        let order = await getAllOrderInfoByIdOrder(or.id);
                        if (order) {
                            orders.push(order.data);
                        }
                    }
                }
            }
            resolve({
                error: 0,
                message: 'Ok',
                data: orders
            });

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

//lấy dịch vụ theo idTransporter
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

let CreateServiceOfTransporter = (serviceArr, idTransporter) => {
    return new Promise(async (resolve, reject) => {
        try {
            for (const service of serviceArr) {
                let serviceofTransporterNew = await db.ServiceOfTransporter.create({
                    idTransporter: idTransporter,
                    keyService: service
                })
                if (serviceofTransporterNew) {
                    resolve({
                        errCode: 0,
                        message: 'Tạo thành công',
                        data: serviceofTransporterNew
                    })
                }
                else {
                    resolve({
                        errCode: 2,
                        message: 'Lỗi khi tạo dịch vụ cho người dùng',
                    })
                }
            };
        } catch (error) {
            reject(error);
        }
    })
}

let DeleteServiceOfTransporter = async (serviceArr, idTransporter) => {
    return new Promise(async (resolve, reject) => {
        try {
            for (const service of serviceArr) {
                let foundServiceOfTrans = await db.ServiceOfTransporter.findOne({
                    where: {
                        idTransporter: idTransporter,
                        keyService: service
                    }
                })
                if (foundServiceOfTrans) {
                    await db.ServiceOfTransporter.destroy({
                        where: {
                            idTransporter: idTransporter,
                            keyService: service
                        },
                    });
                    resolve({
                        errCode: 0,
                        message: 'Dịch vụ của nhà vận chuyển này đã được xóa!'
                    })
                } else {
                    resolve({
                        errCode: 2,
                        message: `Dịch vụ của nhà vận chuyển không tồn tại!!!`
                    })
                }
            };
        } catch (error) {
            reject(error)
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
let editInfoTrans = (transporterEdit) => {
    return new Promise(async (resolve, reject) => {
        try {
            // thêm userLocation, nếu đã tồn tại thì xóa
            if (transporterEdit.id) {

                let user = await db.User.findOne({
                    where: { id: transporterEdit.id },
                    raw: false,
                })
                if (user) {
                    user.image = transporterEdit.image;
                    user.email = transporterEdit.email;
                    user.address = transporterEdit.address;
                    user.idDefaultLocation = transporterEdit.idDefaultLocation;
                    await user.save();

                    let transporter = await db.Transporter.findOne({
                        where: { id: transporterEdit.idTransporter },
                        raw: false,
                    })
                    if (transporter) {

                        transporter.transporterName = transporterEdit.transporterName;
                        transporter.description = transporterEdit.description;
                        transporter.foundingDate = transporterEdit.foundingDate;
                        transporter.status = 1;
                        await transporter.save();

                        let userNew = await db.User.findOne({
                            where: {
                                id: transporterEdit.id,
                                idTransporter: transporterEdit.idTransporter, // Điều kiện để lọc các phần tử của bảng A
                            },
                            raw: true,
                        })
                        delete userNew.password;

                        let transporterNew = await db.Transporter.findOne({
                            where: {
                                id: transporterEdit.idTransporter, // Điều kiện để lọc các phần tử của bảng A
                            },
                            raw: true,
                        })

                        delete transporterNew.id;

                        resolve({
                            errCode: 0,
                            message: 'Chỉnh sửa thành công',
                            data: { userNew, transporterNew },

                        })
                    }
                } else {
                    resolve({
                        errCode: 1,
                        message: `Người dùng không tồn tại!!!`
                    })
                }
            } else {
                resolve({
                    errCode: 2,
                    message: 'Vui lòng nhập thông tin!!!'
                })
            }
        }

        catch (error) {
            reject(error);
        }
    })
}


let CreateScopeOfTransporter = (scopeArr, idTransporter) => {
    return new Promise(async (resolve, reject) => {
        try {
            for (const scope of scopeArr) {
                let scopeofTransporterNew = await db.ScopeOfTransporter.create({
                    idTransporter: idTransporter,
                    keyScope: scope
                })
                if (scopeofTransporterNew) {
                    resolve({
                        errCode: 0,
                        message: 'Tạo thành công',
                        data: scopeofTransporterNew
                    })
                }
                else {
                    resolve({
                        errCode: 2,
                        message: 'Lỗi khi tạo phạm vi hoạt động cho người dùng',
                    })
                }
            };
        } catch (error) {
            reject(error);
        }
    })
}


let DeleteScopeOfTransporter = async (scopeArr, idTransporter) => {
    return new Promise(async (resolve, reject) => {
        try {
            for (const scope of scopeArr) {
                let foundScopeOfTrans = await db.ScopeOfTransporter.findOne({
                    where: {
                        idTransporter: idTransporter,
                        keyScope: scope
                    }
                })
                if (foundScopeOfTrans) {
                    await db.ScopeOfTransporter.destroy({
                        where: {
                            idTransporter: idTransporter,
                            keyScope: scope
                        },
                    });
                    resolve({
                        errCode: 0,
                        message: 'Phạm vi hoạt động của nhà vận chuyển này đã được xóa!'
                    })
                } else {
                    resolve({
                        errCode: 2,
                        message: `Phạm vi hoạt động của nhà vận chuyển không tồn tại!!!`
                    })
                }
            };
        } catch (error) {
            reject(error)
        }
    })
}


let CreateCostOfTransporter = (keyService, costArr, idTransporter) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("hi");
            let costOfTransporterNewArr = [];
            let i = 0;
            console.log('keyService, costArr, idTransporter', keyService, costArr, idTransporter)
            for (const cost of costArr) {
                let costOfTransporterNew = await db.Cost.create({
                    keyService: keyService,
                    keyCost: 'C' + i,
                    cost: cost,
                    idTransporter: idTransporter,
                })
                i++;
                costOfTransporterNewArr.push(costOfTransporterNew);
            };
            if (costOfTransporterNewArr) {
                resolve({
                    errCode: 0,
                    message: 'Tạo thành công',
                    data: costOfTransporterNewArr
                })
            }
            else {
                resolve({
                    errCode: 2,
                    message: 'Lỗi khi tạo chi phí cho nhà vận chuyển',
                })
            }
        } catch (error) {
            reject({
                errCode: 3,
                message: error,
            });
        }
    })
}


let GetCostOfTransporterByService = (keyService, idTransporter) => {
    return new Promise(async (resolve, reject) => {
        try {
            let costofTrans = await db.Cost.findAll({
                where: {
                    idTransporter, keyService
                },
                raw: false,
            });

            resolve({
                errCode: 0,
                message: 'OK',
                data: costofTrans,
            })
        }

        catch (error) {
            console.log(error)
            reject(error);
        }
    })
}


let UpdateCostOfTransporterByService = (keyService, costArr, idTransporter) => {
    return new Promise(async (resolve, reject) => {
        try {
            let costOfTransporterNewArr = [];
            let i = 0;
            let costOfTransporter = await db.Cost.findAll({
                where: { keyService, idTransporter },
                raw: false,
            })
            // nếu cost của transporter đã tồn tại thì cập nhật
            if (costOfTransporter.length > 0) {
                for (const price of costOfTransporter) {
                    price.cost = costArr[i];
                    await price.save();
                    i++;
                    costOfTransporterNewArr.push(price);
                }
                resolve({
                    errCode: 0,
                    message: 'Cập nhật thành công',
                    data: costOfTransporterNewArr
                })
            }
            // chưa tồn tại thì tạo cost
            else {
                let createCostTransporter = await CreateCostOfTransporter(keyService, costArr, idTransporter);
                if (createCostTransporter && createCostTransporter.data.length > 0) {
                    resolve({
                        errCode: 0,
                        message: 'Tạo thành công',
                        data: createCostTransporter.data,
                    })
                }
                else {
                    resolve({
                        errCode: 2,
                        message: 'Lỗi khi cập nhật chi phí nhà vận chuyển',
                    })
                }
            }
        }

        catch (error) {
            console.log(error)
            reject(error);
        }
    })
}


//quản lý tài xế theo nhà vận chuyển
let GetAllDriverOfTransporter = (idTransporter) => {
    return new Promise(async (resolve, reject) => {
        try {
            let allDrivers = await db.User.findAll({
                where: {
                    idTransporter,
                    keyRole: 'R3'
                },
                raw: false,
            });

            resolve({
                errCode: 0,
                message: 'OK',
                data: allDrivers,
            })
        }
        catch (error) {
            console.log(error)
            reject(error);
        }
    })
}


let deleteDriver = async (idDriverDel) => {
    return new Promise(async (resolve, reject) => {
        try {
            let foundDriver = await db.User.findOne({
                where: { id: idDriverDel }
            })

            if (foundDriver) {
                let imageDriver = foundDriver.image;
                if (imageDriver) {
                    await removeFileService(imageDriver);
                }
                await db.User.destroy({
                    where: {
                        id: idDriverDel
                    },
                });
                resolve({
                    errCode: 0,
                    message: 'Tài xế đã được xóa!'
                })
            } else {
                resolve({
                    errCode: 2,
                    message: `Tài xế không tồn tại!!!`
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}


let editDriver = (driverEdit) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (driverEdit.id) {
                let driver = await db.User.findOne({
                    where: { id: driverEdit.id },
                    raw: false
                });
                if (driver) {
                    let phone = await db.User.findOne({
                        where: {
                            phone: driverEdit.phone,
                            id: { [Op.ne]: driverEdit.id },
                            keyRole: 'R3'
                        }
                    })
                    console.log(phone)
                    if (!phone) {
                        driver.image = driverEdit.image;
                        driver.userName = driverEdit.userName;
                        driver.phone = driverEdit.phone;
                        driver.address = driverEdit.address;
                        driver.email = driverEdit.email;
                        driver.birthday = driverEdit.birthday;
                        driver.keyGender = driverEdit.keyGender;
                        driver.status = driverEdit.status;

                        await driver.save();
                        resolve({
                            errCode: 0,
                            message: 'Sửa tài xế thành công',
                            data: driver,
                        })
                    }
                    else {
                        resolve({
                            errCode: 3,
                            message: 'Số điện thoại của tài xế đã tồn tại',
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

// lấy tất cả nhà vận chuyển theo id nhà vận chuyển
let getAllTransporterByIdTransporter = (status) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (status) {
                let transporterList = await db.Transporter.findAll({
                    where: {
                        status: status,
                    },
                    include: [
                        {
                            model: db.User, // thông tin khách hàng
                            as: 'UserTransporter', // Đặt tên cho mối quan hệ
                            where: {
                                keyRole: 'R2',
                            },
                            attributes: { 
                                exclude: [
                                    'userName', 
                                    'birthday', 
                                    'keyGender', 
                                    'idTransporter', 
                                    'status', 
                                    'password',
                                ] 
                            },
                        },
                        {
                            model: db.ServiceOfTransporter, // dịch vụ của đơn hàng
                            as: 'ServiceOfTransporter', // Đặt tên cho mối quan hệ
                            attributes: { 
                                exclude: [
                                    'idTransporter', 
                                    'createdAt',
                                    'updatedAt',
                                ] 
                            },
                        },
                        {
                            model: db.Cost, // dịch vụ của đơn hàng
                            as: 'CostOfTransporter', // Đặt tên cho mối quan hệ
                            attributes: { 
                                exclude: [
                                    'idTransporter', 
                                    'createdAt',
                                    'updatedAt',
                                ] ,
                            },
                        },
                    ],
                    raw: false,
                })
         
                if(transporterList && transporterList.length > 0){
                    let transporterLocationList = await Promise.all(transporterList.map( async (item, index) => {
                        if(item.UserTransporter && item.UserTransporter.idDefaultLocation){
                            let transporterLocation = await db.UserLocation.findOne({
                                where: {
                                    id: item.UserTransporter.idDefaultLocation
                                }
                            })
                            if(transporterLocation){
                                return transporterLocation;
                            }
                        } else {
                            return {};
                        }
                    }))

                    if(transporterLocationList && transporterLocationList.length > 0){
                        transporterList.map((item, index) => {
                            item.setDataValue('TransporterLocation', transporterLocationList[index]);
                        })
                    } 

                    
                    resolve({
                        errCode: 0,
                        message: 'Lấy danh sách nhà vận chuyển thành công!!!',
                        data: transporterList,
                    })
                } else {
                    resolve({
                        errCode: 2,
                        message: 'Danh sách nhà vận chuyển không tồn tại!!!',
                        data: [],
                    })
                }

            } else {
                resolve({
                    errCode: 1,
                    message: `Vui lòng nhập trạng thái hoạt động của nhà vận chuyển!!!`,
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}


// lấy thông tin nhà vận chuyển theo id nhà vận chuyển
let getTransporterInfoByIdTransporter = (idTransporter) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (idTransporter) {
                let transporterInfo = await db.Transporter.findOne({
                    where: {
                        id: idTransporter,
                    },
                    include: [
                        {
                            model: db.User, // thông tin khách hàng
                            as: 'UserTransporter', // Đặt tên cho mối quan hệ
                            where: {
                                keyRole: 'R2',
                            },
                            attributes: { 
                                exclude: [
                                    'userName', 
                                    'birthday', 
                                    'keyGender', 
                                    'idTransporter', 
                                    'status', 
                                    'password',
                                ] 
                            },
                        },
                        {
                            model: db.ServiceOfTransporter, // dịch vụ của đơn hàng
                            as: 'ServiceOfTransporter', // Đặt tên cho mối quan hệ
                            attributes: { 
                                exclude: [
                                    'idTransporter', 
                                    'createdAt',
                                    'updatedAt',
                                ] 
                            },
                        },
                        // {
                        //     model: db.Cost, // dịch vụ của đơn hàng
                        //     as: 'CostOfTransporter', // Đặt tên cho mối quan hệ
                        //     attributes: { 
                        //         exclude: [
                        //             'idTransporter', 
                        //             'createdAt',
                        //             'updatedAt',
                        //         ] ,
                        //     },
                        // },
                    ],
                    raw: false,
                })
         
                if(transporterInfo){
                    if(transporterInfo && transporterInfo.UserTransporter && transporterInfo.UserTransporter.idDefaultLocation){
                        let transporterLocation = await db.UserLocation.findOne({
                            where: {
                                id: transporterInfo.UserTransporter.idDefaultLocation
                            }
                        })
                        if(transporterLocation){
                            transporterInfo.setDataValue('TransporterLocation', transporterLocation);
                        }
                    }
                    
                    resolve({
                        errCode: 0,
                        message: 'Lấy thông tin nhà vận chuyển thành công!!!',
                        data: transporterInfo,
                    })
                } else {
                    resolve({
                        errCode: 2,
                        message: 'Nhà vận chuyển không tồn tại!!!',
                        data: {},
                    })
                }

            } else {
                resolve({
                    errCode: 1,
                    message: `Vui lòng nhập id của nhà vận chuyển!!!`,
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}


//tìm kiếm nhà vận chuyển theo từ khóa (tên)
let searchTransporterByName = (keyword) => {
    return new Promise(async (resolve, reject) => {
        try {
            let allTransporter = await db.Transporter.findAll({
                where: {
                    // transporterName: { [Op.like]: `%${keywordFormatted}%` },
                    status: 1,
                },
            });

            let keywordFormatted =  removeAccents(keyword.toLowerCase());

            if(allTransporter){
                let allTransporterFilter = allTransporter.filter((transporter) => 
                    removeAccents(transporter.transporterName.toLowerCase()).includes(keywordFormatted)
                )

                resolve({
                    errCode: 0,
                    message: 'OK',
                    data: allTransporterFilter,
                })
            } else {
                resolve({
                    errCode: 1,
                    message: 'Không tìm thấy nhà vận chuyển nào!!!',
                    data: [],
                })
            }
        }
        catch (error) {
            console.log(error)
            reject(error);
        }
    })
}


// xóa dấu tiếng việt =>  dùng cho hàm tìm kiếm tên tài xế
let removeAccents = (str) => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, " ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
    return str;
}


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
    editInfoTrans,
    CreateServiceOfTransporter,
    DeleteServiceOfTransporter,
    CreateScopeOfTransporter,
    DeleteScopeOfTransporter,
    CreateCostOfTransporter,
    GetCostOfTransporterByService,
    UpdateCostOfTransporterByService,
    GetAllDriverOfTransporter,
    deleteDriver,
    editDriver,
    getAllTransporterByIdTransporter,
    getTransporterInfoByIdTransporter,
    searchTransporterByName,
}