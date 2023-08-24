import db from '../models/index';

import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

////tạo mới người dùng vào database - trả về thông tin user nếu thêm thành công
let createNewUser = (userInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (userInput.email) {
                let check = await checkUserEmail(userInput.email);
                if (check) {
                    resolve({
                        errCode: 1,
                        message: 'Your email is already exist, Please try another email'
                    })
                } else {
                    if (userInput.password) {
                        let hashPasswordFromBcrypt = await hashUserPassword(userInput.password)
                        await db.User.create({
                            firstName: userInput.firstName,
                            lastName: userInput.lastName,
                            birthday: userInput.birthday,
                            genderId: userInput.genderId === 'M' ? true : false,
                            address: userInput.address,
                            email: userInput.email,
                            password: hashPasswordFromBcrypt,
                            phone: userInput.phone,
                            status: userInput.status,
                            idRole: userInput.idRole,
                        })

                        let user = await db.User.findOne({
                            where: { email: userInput.email },
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
                    message: 'Email not found',
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

// kiểm tra email đã tồn tại trong database hay chưa, trả về true nếu đã tồn tại, ngược lại là false
let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    email: userEmail
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
let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        let userData = {};

        try {
            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    // attributes: ['email', 'roleId', 'password'],
                    where: { email: email, },
                    raw: true,
                })

                // check email hop le?
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
                userData.message = `Your's email isn't exist in your system. Please try again`
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
                    user.firstName = data.firstName;
                    user.lastName = data.lastName;
                    user.birthday = data.birthday;
                    user.genderId = data.genderId;
                    user.address = data.address;
                    user.phone = data.phone;

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