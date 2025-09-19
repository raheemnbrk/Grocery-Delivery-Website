import Address from "../models/address.mjs"

const addAddress = async (req, res) => {
    try {
        const { addressData } = req.body
        const { userId } = req
        await Address.create({ ...addressData , userId })
        res.json({ success: true, message: "address added successfully." })
    }
    catch (err) {
        console.log(err)
        res.json({ success: false, message: err.message })
    }
}

const getAddress = async (req, res) => {
    try {
        const { userId } = req
        const addresses = await Address.find({ userId })
        res.json({ success: true, addresses })
    }
    catch (err) {
        console.log(err)
        res.json({ success: false, message: err.message })
    }
}

export {
    addAddress, getAddress
}