import costService from '../service/costService';

// lấy tất cả dữ liệu trong bảng CostCode - trung gian
let handleGetCostCode = async (req, res) => {

    let message = await costService.getCostCode();

    return res.status(200).json(message);
}

module.exports = {
    handleGetCostCode,
}