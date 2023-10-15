import locationService from '../service/locationService';

//tạo mới người dùng 
let handleCreateNewLocation = async (req, res) => {
    let userLocationInput = req.body;
    console.log(userLocationInput);
    
    let message = await locationService.createNewUserLocation(userLocationInput);
    return res.status(200).json(message)
}

//lấy tất cả tọa độ theo người dùng trong data
let handleGetAllUserLocation = async (req, res) => {
    let idUser = req.query.id; //all , id
    
    let message = await locationService.getAllUserLocation(idUser);
    return res.status(200).json(message)
}

module.exports = {
    handleCreateNewLocation,
    handleGetAllUserLocation,
}