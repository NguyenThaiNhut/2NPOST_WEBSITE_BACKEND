import db from '../models/index';
import fs from "fs";
import path from "path";

import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

////tạo mới người dùng vào database - trả về thông tin user nếu thêm thành công
let createNewUser = (userInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (userInput.phone) {
                let check = await checkUserPhoneBykeyRole(userInput.phone, userInput.keyRole);
                if (check) {
                    resolve({
                        errCode: 1,
                        message: 'Số điện thoại đã tồn tại, vui lòng nhập số điện thoại khác!!!'
                    })
                } else {
                    if (userInput.password) {
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
                            idTransporter: userInput.idTransporter,
                        })

                        let user = await db.User.findOne({
                            where: { phone: userInput.phone },
                            raw: true,
                        })

                        delete user.password

                        resolve({
                            errCode: 0,
                            message: 'OK',
                            data: user,
                        })
                    } else {
                        resolve({
                            errCode: 3,
                            message: 'Mật khẩu không được tìm thấy!!!',
                        })
                    }
                }
            } else {
                resolve({
                    errCode: 2,
                    message: 'Số điện thoại không được tìm thấy!!!',
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

// kiểm tra phone đã tồn tại chưa, dựa vào ROLE, trả về true nếu phone này đã tạo role này rồi, false nếu phone này chưa tạo role
// => dùng cho tạo tài khoản
let checkUserPhoneBykeyRole = (userPhone, Role) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    phone: userPhone,
                    keyRole: Role
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

// kiểm tra phone đã tồn tại trong database hay chưa, trả về true nếu đã tồn tại, ngược lại là false 
// => dùng cho đăng nhập
let checkUserPhone = (userPhone) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    phone: userPhone,
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

//băm mật khẩu của người dùng  
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (error) {
            reject(error)
        }
    })
}

//lấy tất cả người dùng trong database
let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    },
                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: {
                        id: userId,
                    },
                    attributes: {
                        exclude: ['password']
                    },
                })
            }
            resolve(users)

        } catch (error) {
            reject(error);
        }
    })
}

//đăng nhập
let handleUserLogin = (phone, password, keyRole) => {
    return new Promise(async (resolve, reject) => {
        let userData = {};

        try {
            let isExist = await checkUserPhoneBykeyRole(phone, keyRole);

            if (isExist) {
                let user = await db.User.findOne({
                    // attributes: ['phone', 'roleId', 'password'],
                    where: {
                        phone: phone,
                        keyRole: keyRole
                    },

                    raw: true,
                })
                // check phone hop le?
                if (user) {
                    let check = bcrypt.compareSync(password, user.password);
                    // check pass hop le?
                    if (check) {
                        userData.errCode = 0;
                        userData.message = 'Đăng nhập thành công!';
                        delete user.password;
                        userData.data = user;
                    } else {
                        userData.errCode = 4;
                        userData.message = 'Mật khẩu sai!!!'
                    }
                } else {
                    userData.errCode = 3;
                    userData.message = `Người dùng không tồn tại!!!`
                }

            } else {
                userData.errCode = 2;
                userData.message = `Số điện thoại của bạn không tồn tại trong hệ thống. Vui lòng thử lại!!!`
            }

            resolve(userData);

        } catch (error) {
            reject(error);
        }
    })
}

// chỉnh sửa thông tin người dùng
let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data.id) {
                let user = await db.User.findOne({
                    where: { id: data.id },
                    raw: false,
                })
                if (user) {
                    user.userName = data.userName;
                    user.birthday = data.birthday;
                    user.keyGender = data.keyGender;
                    user.email = data.email;
                    user.address = data.address;

                    await user.save();

                    resolve({
                        errCode: 0,
                        message: 'Thông tin người dùng đã được cập nhật!'
                    })
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

        } catch (error) {
            reject(error);
        }
    })
}

// xóa người dùng theo id
let deleteUser = async (idUserDel) => {
    return new Promise(async (resolve, reject) => {
        try {
            let foundUser = await db.User.findOne({
                where: { id: idUserDel }
            })

            if (foundUser) {
                await db.User.destroy({
                    where: {
                        id: idUserDel
                    },
                });
                resolve({
                    errCode: 0,
                    message: 'Người dùng đã được xóa!'
                })
            } else {
                resolve({
                    errCode: 2,
                    message: `Người dùng không tồn tại!!!`
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}

let removeFileService = async (fileName) => {
    return new Promise(async (resolve, reject) => {
        try {
            const directoryPath = path.join(__dirname, "../public");
            fs.unlink(directoryPath + fileName, (err) => {
                if (err) {
                    resolve({
                        message: "Could not delete the file. " + err,
                    });
                }

                resolve({
                    message: "File is deleted.",
                });
            });

        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    handleUserLogin,
    getAllUsers,
    createNewUser,
    deleteUser,
    updateUser,
    checkUserPhoneBykeyRole,
    hashUserPassword,
    removeFileService,
}