import jwt from 'jsonwebtoken';

const { SK_ADMIN } = process.env;

export const authAdmin = (req, res, next) => {

    const TOKEN_ADMIN = req.headers.authentication && req.headers.authentication.slice(7);
    
    if (TOKEN_ADMIN === undefined || TOKEN_ADMIN === "null") {
        res.status(404).json({ msg: "token not found" });
        return;
    } else {
        jwt.verify(TOKEN_ADMIN, SK_ADMIN, (err, decoded) => {
            if (err) {
                res.status(401).json({ status: 401, msg: "token invalid" });
                return;
            } else {
                req.params.email = decoded.email;
                next();
            }
        });
    }
}