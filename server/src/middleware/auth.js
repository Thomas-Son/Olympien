import jwt from 'jsonwebtoken';

const { SK } = process.env;

const auth = (req, res, next) => {

    const TOKEN = req.headers.authentication.slice(7);

    if (TOKEN === undefined || TOKEN === "null") {
        res.status(404).json({ msg: "token not found" });
        return;
    } else {
        jwt.verify(TOKEN, SK, (err, decoded) => {
            if (err) {
                res.status(401).json({ status: 401, msg: "token invalid" });
                return;
            } else {
                req.params = decoded;
                next();
            }
        });
    }
}

export { auth };