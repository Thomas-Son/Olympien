import jwt from 'jsonwebtoken';

const { RSK } = process.env;

const refreshAuth = (req, res) => {

    const TOKEN = req.headers.authentication.slice(7);

    if (TOKEN === undefined || TOKEN === "null") {
        res.status(404).json({ msg: "token not found" });
        return;
    } else {
        jwt.verify(TOKEN, RSK, (err, user) => {
            if (err) {
                res.status(401).json({ status: 401, msg: "token invalid" });
                return;
            } 

            delete user.iat;
            delete user.exp;
            const refreshedToken = generateAccessToken(user);
            res.send({
                accessToken: refreshedToken,
            });

        });
    }
}

export { refreshAuth };