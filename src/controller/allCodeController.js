import allCodeService from '../service/allCodeService';

// lấy thông tin AllCode theo 'type'  - trung gian
let handleGetAllCode = async (req, res) => {
    let { type } = req.body;

    let message = await allCodeService.getAllCode(type);

    return res.status(200).json(message);
}

module.exports = {
    handleGetAllCode,
}