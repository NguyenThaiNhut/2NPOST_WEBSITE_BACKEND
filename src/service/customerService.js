import { resolve } from 'app-root-path';
import db from '../models/index';
let createNewOrderByCustomer = (orderInput) => {
    return new Promise(async (resolve, reject) => {
        try {

        }
        catch (error) {
            reject(error);
        }
    })
    // return new Promise(async (resolve, reject) => {
    //     try {
    //         if (userInput.phone) {
    //             let check = await checkUserPhoneBykeyRole(userInput.phone, userInput.keyRole);
    //             if (check) {
    //                 resolve({
    //                     errCode: 1,
    //                     message: 'Your phone is already exist, Please try another phone'
    //                 })
    //             } else {
    //                 if (userInput.password) {
    //                     let hashPasswordFromBcrypt = await hashUserPassword(userInput.password)
    //                     await db.User.create({
    //                         userName: userInput.userName,
    //                         birthday: userInput.birthday,
    //                         keyGender: userInput.keyGender,
    //                         address: userInput.address,
    //                         idDefaultLocation: userInput.idDefaultLocation,
    //                         // image
    //                         email: userInput.email,
    //                         password: hashPasswordFromBcrypt,
    //                         phone: userInput.phone,
    //                         status: userInput.status,
    //                         keyRole: userInput.keyRole,
    //                         idTransporter: userInput.idTransporter,
    //                         status: userInput.status,
    //                     })

    //                     let user = await db.User.findOne({
    //                         where: { phone: userInput.phone },
    //                         raw: true,
    //                     })

    //                     delete user.password

    //                     resolve({
    //                         errCode: 0,
    //                         message: 'OK',
    //                         data: user,
    //                     })
    //                 } else {
    //                     resolve({
    //                         errCode: 3,
    //                         message: 'Password not found',
    //                     })
    //                 }
    //             }
    //         } else {
    //             resolve({
    //                 errCode: 2,
    //                 message: 'Phone not found',
    //             })
    //         }
    //     } catch (error) {
    //         reject(error);
    //     }
    // })
}

module.exports = {
    createNewOrderByCustomer
}