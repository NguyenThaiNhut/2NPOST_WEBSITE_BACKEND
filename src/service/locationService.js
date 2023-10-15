import db from '../models/index';

//tạo mới tọa độ người dùng vào database
let createNewUserLocation = (userLocationInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let {lat, lng, idUser} = userLocationInput;
            console.log('check', lat, lng, idUser);
            
            if (lat && lng && idUser) {
                let checkIdUser = await checkUserId(idUser);
                if(!checkIdUser){
                    resolve({
                        errCode: 2,
                        message: 'ID người dùng không tồn tại!!!'
                    })
                } else {
                    let check = await checkLocationInput(lat, lng, idUser);
                    if (check) {
                        resolve({
                            errCode: 3,
                            message: 'Tọa độ của người dùng này đã tồn tại!!!'
                        })
                    } else {
                        await db.UserLocation.create({
                            lat: lat,
                            lng: lng,
                            idUser: idUser,
                        })

                        let userLocation = await db.UserLocation.findOne({
                            where: { idUser: idUser },
                        })

                        console.log('check userLocation: ', userLocation);

                        resolve({
                            errCode: 0,
                            message: 'Tạo địa chỉ người dùng thành công!!!',
                        })
                    }
                }
            } else {
                resolve({
                    errCode: 1,
                    message: 'Vui lòng thêm đầy đủ thông tin!!!',
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

//kiểm tra tọa độ (theo từng người dùng) đã tồn tại trong hệ thống hay chưa?
let checkLocationInput = (lat, lng, idUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userLocation = await db.UserLocation.findOne({
                where: {
                    lat: lat,
                    lng: lng,
                    idUser: idUser,
                }
            })

            if (userLocation) {
                resolve(true)
            } else {
                resolve(false)
            }

        } catch (error) {
            reject(error)
        }
    })
}

//kiểm tra id người dùng có tồn tại trong hệ thống hay không?
let checkUserId = (idUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    id: idUser,
                }
            })

            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }

        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createNewUserLocation,
}