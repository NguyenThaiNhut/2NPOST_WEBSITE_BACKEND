import customerService from '../service/customerService'

let handleCreateNewOrderByCustomer = async (req, res) => {
    let orderInput = req.body;
    let message = await customerService.createNewUser(userInput);

    return res.status(200).json(message)
}

module.exports = {
    handleCreateNewOrderByCustomer
}