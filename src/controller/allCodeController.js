import allCodeService from '../service/allCodeService';

// lấy thông tin AllCode theo 'type'  - trung gian
let handleGetAllCode = async (req, res) => {
    let { type } = req.query;

    let message = await allCodeService.getAllCode(type);

    return res.status(200).json(message);
}

// lấy thông tin AllCode theo 'key';
let handleGetAllCodeByKey = async (req, res) => {
    let key = req.query.key;
    if (!key) {
        return res.status(200).json({
            errCode: 1,
            message: 'Vui lòng nhập thông tin!!!'
        })
    }
    let message = await allCodeService.getAllCodeByKey(key);
    return res.status(200).json(message);
}


module.exports = {
    handleGetAllCode,
    handleGetAllCodeByKey
}