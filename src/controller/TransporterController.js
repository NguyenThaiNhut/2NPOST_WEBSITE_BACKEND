import TransporterService from '../service/TransporterService';

// lấy tất cả đơn hàng theo trạng thái(order-status) của NVC(idTransporter);
let handleGetOrdersByService = async (req, res) => {
    let orderStatus = req.query.keyOrderStatus;
    let idTransporter = req.query.idTransporter;
    try {
        let message = await TransporterService.getOrdersByService(orderStatus, idTransporter);
        return res.status(200).json(message)

    }
    catch (error) {
        return res.status(200).json({
            error: 1,
            message: 'Vui lòng nhập thông tin!!!'
        })

    }

}

// lấy bảng allcode theo Key - và khi key=All thì nó trả về trạng thái đơn hàng
let handleGetOrderStatusByKey = async (req, res) => {
    let key = req.query.key;
    try {
        let message = await TransporterService.getOrderStatusByKey(key);
        return res.status(200).json(message)
    }
    catch (error) {
        return res.status(200).json({
            error: 1,
            message: 'Vui lòng nhập thông tin!!!'
        })

    }

}

// Tạo transporter
let handleCreateAccountTransporter = async (req, res) => {
    let transporterInput = req.body.transporter;
    let userInput = req.body.user;
    try {
        let message = await TransporterService.CreateAccountTransporter(transporterInput, userInput);
        return res.status(200).json(message)
    }
    catch (error) {
        return res.status(200).json({
            error: 1,
            message: 'Vui lòng nhập thông tin!!!'
        })

    }

}

//lấy TT transporter dựa vào id.user
let handleGetTransporterByIdUser = async (req, res) => {
    let idUser = req.query.id;
    try {
        let message = await TransporterService.GetTransporterByIdUser(idUser);
        return res.status(200).json(message)
    }
    catch (error) {
        return res.status(200).json({
            error: 1,
            message: 'Vui lòng nhập thông tin!!!'
        })

    }

}

//lấy weight by vehicle
let handleGetWeightByVehicle = async (req, res) => {
    let keyTypeOfVehicle = req.query.key;
    try {
        let message = await TransporterService.GetWeightByVehicle(keyTypeOfVehicle);
        return res.status(200).json(message)
    }
    catch (error) {
        return res.status(200).json({
            error: 1,
            message: 'Vui lòng nhập thông tin!!!'
        })

    }

}

// Tạo phương tiện
let handleCreateVehicle = async (req, res) => {
    let vehicleInput = req.body.vehicleInput;
    try {
        let message = await TransporterService.CreateVehicle(vehicleInput);
        return res.status(200).json(message)
    }
    catch (error) {
        return res.status(200).json({
            error: 1,
            message: 'Vui lòng nhập thông tin!!!'
        })

    }
}

//lấy phương tiện theo idTransporter
let handleGetVehicleByIdTransporter = async (req, res) => {
    let idTransporter = req.query.idTransporter;
    try {
        let message = await TransporterService.GetVehicleByIdTransporter(idTransporter);
        return res.status(200).json(message)
    }
    catch (error) {
        return res.status(200).json({
            error: 1,
            message: 'Vui lòng nhập thông tin!!!'
        })

    }

}

// xóa phương tiện theo id
let handleDeleteVehicle = async (req, res) => {
    let id = req.body.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Vui lòng nhập thông tin!!!'
        })
    }

    let message = await TransporterService.deleteVehicle(id);

    return res.status(200).json(message)
}

//chỉnh sửa phương tiện vận chuyển
let handleEditVehicle = async (req, res) => {
    let vehicleEdit = req.body.vehicleEdit;
    let message = await TransporterService.editVehicle(vehicleEdit);
    return res.status(200).json(message)
}

// lấy dịch vụ của transporter
let handleGetServiceOfTransporter = async (req, res) => {
    let idTransporter = req.query.idTransporter;
    try {
        let message = await TransporterService.GetServiceOfTransporter(idTransporter);
        return res.status(200).json(message)

    }
    catch (error) {
        return res.status(200).json({
            error: 1,
            message: 'Vui lòng nhập thông tin!!!'
        })

    }

}

// lấy phạm vi của transporter
let handleGetScopeOfTransporter = async (req, res) => {
    let idTransporter = req.query.idTransporter;
    try {
        let message = await TransporterService.GetScopeOfTransporter(idTransporter);
        return res.status(200).json(message)

    }
    catch (error) {
        return res.status(200).json({
            error: 1,
            message: 'Vui lòng nhập thông tin!!!'
        })

    }

}
//chỉnh sửa thông tin nhà vận chuyển
// let handleEditInfoTrans = async (req, res) => {
//     let transporterEdit = req.body.transporterEdit;
//     let message = await TransporterService.editInfoTrans(transporterEdit);
//     return res.status(200).json(message)
// }

module.exports = {
    handleGetOrdersByService,
    handleGetOrderStatusByKey,
    handleCreateAccountTransporter,
    handleGetTransporterByIdUser,
    handleGetWeightByVehicle,
    handleCreateVehicle,
    handleGetVehicleByIdTransporter,
    handleDeleteVehicle,
    handleEditVehicle,
    handleGetServiceOfTransporter,
    handleGetScopeOfTransporter,
    // handleEditInfoTrans
}