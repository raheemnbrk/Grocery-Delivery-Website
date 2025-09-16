import jwt from "jsonwebtoken"

const authuser = async (req, res, next) => {
    const { token } = req.cookies
    if (!token) {
        return res.json({ success: false, message: "not authorized" })
    }
    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if(tokenDecode.id){
            req.userId = tokenDecode.id
        }
        else{
            return res.json({ success: false, message: "not authorized" })
        }
        next()
    }
    catch (err) {
        console.log(err)

    }
}

export default authuser