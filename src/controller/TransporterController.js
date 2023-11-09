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
    console.log('check id transporter: ', idUser);
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

let handleCreateServiceOfTransporter = async (req, res) => {
    //[keyService], idTransporter
    let serviceArr = req.body.serviceArr;
    let idTransporter = req.body.idTransporter;

    let message = await TransporterService.CreateServiceOfTransporter(serviceArr, idTransporter);
    return res.status(200).json(message)
}

let handleDeleteServiceOfTransporter = async (req, res) => {
    let serviceArr = req.body.serviceArr;
    let idTransporter = req.body.idTransporter;
    if (!idTransporter && !serviceArr) {
        return res.status(200).json({
            errCode: 1,
            message: 'Vui lòng nhập thông tin!!!'
        })
    }

    let message = await TransporterService.DeleteServiceOfTransporter(serviceArr, idTransporter);

    return res.status(200).json(message)
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
// chỉnh sửa thông tin nhà vận chuyển
let handleEditInfoTrans = async (req, res) => {
    let transporterEdit = req.body.transporterEdit;
    let message = await TransporterService.editInfoTrans(transporterEdit);
    return res.status(200).json(message)
}

let handleCreateScopeOfTransporter = async (req, res) => {
    //[keyScope], idTransporter
    let scopeArr = req.body.scopeArr;
    let idTransporter = req.body.idTransporter;
    let message = await TransporterService.CreateScopeOfTransporter(scopeArr, idTransporter);
    return res.status(200).json(message)
}

let handleDeleteScopeOfTransporter = async (req, res) => {
    let scopeArr = req.body.scopeArr;
    let idTransporter = req.body.idTransporter;
    if (!idTransporter && !scopeArr) {
        return res.status(200).json({
            errCode: 1,
            message: 'Vui lòng nhập thông tin!!!'
        })
    }

    let message = await TransporterService.DeleteScopeOfTransporter(scopeArr, idTransporter);

    return res.status(200).json(message)
}

//chi phí nhà vận chuyển
let handleCreateCostOfTransporter = async (req, res) => {
    let keyService = req.body.keyService;
    let costArr = req.body.costArr;
    let idTransporter = req.body.idTransporter;
    console.log(keyService, costArr, idTransporter)
    let message = await TransporterService.CreateCostOfTransporter(keyService, costArr, idTransporter);
    return res.status(200).json(message)
}
let handleGetCostOfTransporterByService = async (req, res) => {
    let keyService = req.query.keyService;
    let idTransporter = req.query.idTransporter;
    try {
        let message = await TransporterService.GetCostOfTransporterByService(keyService, idTransporter);
        return res.status(200).json(message)

    }
    catch (error) {
        return res.status(200).json({
            error: 1,
            message: 'Vui lòng nhập thông tin!!!'
        })
    }
}
let handleUpdateCostOfTransporterByService = async (req, res) => {
    let keyService = req.body.keyService;
    let costArr = req.body.costArr;
    let idTransporter = req.body.idTransporter;
    try {
        let message = await TransporterService.UpdateCostOfTransporterByService(keyService, costArr, idTransporter);
        return res.status(200).json(message)

    }
    catch (error) {
        return res.status(200).json({
            error: 1,
            message: 'Vui lòng nhập thông tin!!!'
        })
    }
}

//quản lý tài xế theo nhà vận chuyển
let handleGetAllDriverOfTransporter = async (req, res) => {
    let idTransporter = req.query.idTransporter;
    try {
        let message = await TransporterService.GetAllDriverOfTransporter(idTransporter);
        return res.status(200).json(message)
    }
    catch (error) {
        return res.status(200).json({
            error: 1,
            message: 'Vui lòng nhập thông tin!!!'
        })
    }
}
let handleGetDriverById = async (req, res) => {
    let id = req.query.id;
    try {
        let message = await TransporterService.GetDriverById(id);
        return res.status(200).json(message)
    }
    catch (error) {
        return res.status(200).json({
            error: 1,
            message: 'Vui lòng nhập thông tin!!!'
        })
    }
}
let handleDeleteDriver = async (req, res) => {
    let id = req.body.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Vui lòng nhập thông tin!!!'
        })
    }
    let message = await TransporterService.deleteDriver(id);
    return res.status(200).json(message)
}

let handleEditDriver = async (req, res) => {
    let driverEdit = req.body.driverEdit;
    let message = await TransporterService.editDriver(driverEdit);
    return res.status(200).json(message)
}

//trung gian - lấy tất cả nhà vận chuyển theo trạng thái hoạt động của nhà vận chuyển 
let handleGetAllTransporterByIdTransporter = async (req, res) => {
    let status = req.query.status;

    let message = await TransporterService.getAllTransporterByIdTransporter(status);
    return res.status(200).json(message)
}

//trung gian - // lấy thông tin nhà vận chuyển theo id nhà vận chuyển 
let handleGetTransporterInfoByIdTransporter = async (req, res) => {
    let idTransporter = req.query.id;
    
    let message = await TransporterService.getTransporterInfoByIdTransporter(idTransporter);
    return res.status(200).json(message)
}

//trung gian - //tìm kiếm nhà vận chuyển theo từ khóa (tên) 
let handleSearchTransporterByName = async (req, res) => {
    let keyword = req.query.keyword;
    
    let message = await TransporterService.searchTransporterByName(keyword);
    return res.status(200).json(message)
}

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
    handleEditInfoTrans,
    handleCreateServiceOfTransporter,
    handleDeleteServiceOfTransporter,
    handleCreateScopeOfTransporter,
    handleDeleteScopeOfTransporter,
    handleCreateCostOfTransporter,
    handleGetCostOfTransporterByService,
    handleUpdateCostOfTransporterByService,
    handleGetAllDriverOfTransporter,
    handleDeleteDriver,
    handleEditDriver,
    handleGetAllTransporterByIdTransporter,
    handleGetDriverById,
    handleGetTransporterInfoByIdTransporter,
    handleSearchTransporterByName,
}