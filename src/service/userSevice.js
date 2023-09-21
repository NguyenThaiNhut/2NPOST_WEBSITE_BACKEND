import db from '../models/index';

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
                        message: 'Your phone is already exist, Please try another phone'
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
                            status: userInput.status,
                        })

                        let user = await db.User.findOne({
                            where: { phone: userInput.phone },
                            raw: true,
                        })

                        delete user.password

                        console.log('check user: ', user)
                        resolve({
                            errCode: 0,
                            message: 'OK',
                            data: user,
                        })
                    } else {
                        resolve({
                            errCode: 3,
                            message: 'Password not found',
                        })
                    }
                }
            } else {
                resolve({
                    errCode: 2,
                    message: 'Phone not found',
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
            console.log(isExist);

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
                        userData.message = 'Login successful';
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 4;
                        userData.message = 'Password mismatch'
                    }
                } else {
                    userData.errCode = 3;
                    userData.message = `User's not found~`
                }

            } else {
                userData.errCode = 2;
                userData.message = `Your's phone isn't exist in your system. Please try again`
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
                        message: 'The user has been updated'
                    })
                } else {
                    resolve({
                        errCode: 1,
                        message: `The user isn't exist`
                    })
                }
            } else {
                resolve({
                    errCode: 2,
                    message: 'missing required parameter'
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
                    message: 'The user has been deleted'
                })
            } else {
                resolve({
                    errCode: 2,
                    message: `The user isn't exist`
                })
            }

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
}