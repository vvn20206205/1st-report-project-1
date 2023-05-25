
// yarn add jsonwebtoken
// Do demo chức năng thực tê nên để token ở header "Authentication"
const JWT = require('jsonwebtoken')
require('dotenv').config(); 

const MaHoa = async (req, res, next) => {
    const { username } = req.body;

    const token=JWT.sign({
        iss: process.env.SEVER,
        sub: username,
        iat: new Date().getTime()
    }, process.env.JWT_SECRET)
    
    return res.status(200).json({
        token: token
    })
}
const GiaiMa = async (req, res, next) => {
    const { token } = req.body;

    JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(200).json({
                message: 'Xác minh không thành công:', err
            })
        } else {
            return res.status(200).json({
                message: 'Thông tin người dùng:', decoded
            })
        }
    })
}

module.exports = {
    MaHoa,
    GiaiMa
} 