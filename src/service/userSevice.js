import db from '../models/index';

import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

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
                        userData.errCode = 3;
                        userData.message = 'Password mismatch'
                    }
                } else {
                    userData.errCode = 2;
                    userData.message = `User's not found~`
                }

            } else {
                userData.errCode = 1;
                userData.message = `Your's email isn't exist in your system. Please try again`
            }

            resolve(userData);

        } catch (error) {
            reject(error);
        }
    })
}

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

let createNewUser = (userInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(userInput.email);
            if (check) {
                resolve({
                    errCode: 1,
                    message: 'Your email is already exist, Please try another email'
                })
            } else {
                let hashPasswordFromBcrypt = await hashUserPassword(userInput.password)
                await db.User.create({
                    email: userInput.email,
                    password: hashPasswordFromBcrypt,
                    firstName: userInput.firstName,
                    lastName: userInput.lastName,
                    address: userInput.address,
                    phoneNumber: userInput.phoneNumber,
                    gender: userInput.gender === '1' ? true : false,
                    roleId: userInput.roleId,
                })
                resolve({
                    errCode: 0,
                    message: 'OK'
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

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
                    errCode: 1,
                    message: `The user isn't exist`
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}

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
                    user.address = data.address;
                    user.phoneNumber = data.phoneNumber;
                    // user.gender = data.gender;

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

module.exports = {
    handleUserLogin,
    getAllUsers,
    createNewUser,
    deleteUser,
    updateUser,
}