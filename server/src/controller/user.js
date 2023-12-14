import { hash, compare } from "bcrypt";
import Query from "../model/Query.js";
import jsonwebtoken from "jsonwebtoken";

const { sign } = jsonwebtoken;
const { SK } = process.env;
const SALT = 10;

const check_token = async (req, res) => {
    try {
        const queryUser = "SELECT alias, email, password, role.label AS role FROM user  JOIN role ON role.id = user.role_id WHERE alias = ?";
        await Query.findByValue(queryUser, req.params.alias);
        res.status(200).json({ msg: "authentifié", id: queryUser.alias, role: queryUser.role })
    } catch (error) {
        throw Error(error);
    }
};

const signin = async (req, res) => {
    try {
        let msg = "";
        const datas = { alias: req.body.alias, email: req.body.email };
        const queryUser = "SELECT user.id, alias, email, password, role.label AS role FROM user JOIN role ON role.id = user.role_id WHERE alias = ? AND email = ?";
        const [user] = await Query.findByDatas(queryUser, datas);

        if (user.length) {
            msg = "Utilisateur trouvé";
            const samePWD = await compare(req.body.password, user[0].password);
            if (samePWD) {
                const TOKEN = sign({ alias: user[0].alias }, SK, { expiresIn: '1h' } );
                res.status(200).json({ msg, TOKEN }); 
            }
            if (!samePWD) {
                msg = "Mot de passe incorrecte";
                res.status(401).json({ msg })
            }
        }
        if (!user.length) {
            msg = "Mauvais identifiants";
            res.status(409).json({ msg });
        }
    } catch (error) {
        throw Error(error);
    }
};

const createAccount = async (req, res) => {
    try {
        let msg = "";
        const datas = { alias: req.body.alias, email: req.body.email };
        const queryUser =
            "SELECT alias, email FROM user WHERE alias = ? OR email = ?";
        const [user] = await Query.findByDatas(queryUser, datas);

        if (user.length) {
            msg = "un utilisateur avec cette identifiant ou email existe déjà";
            res.status(409).json({ msg });

        }

        if (!user.length) {
            const datas = {
                alias: req.body.alias,
                email: req.body.email,
                password: await hash(req.body.password, SALT),
            };
            const query =
                "INSERT INTO user (alias, email, password, role_id, description, create_at) VALUES(?, ?, ?, 1, 'soon.', NOW())";
            const [account] = await Query.write(query, datas);

            const photo ={
                photo_url: "no-picture.webp",
                user_id: account.insertId,
            }

            const query2 = "INSERT INTO photo (photo_url, user_id) VALUES (?, ?)";
            await Query.write(query2, photo)

            msg = "utilisateur créé";
            res.status(201).json({ msg });
        }
    } catch (error) {
        throw Error(error);
    }
};

const signout = (req, res) => {
    try{
        req.session.destroy();
        msg = "deconnexion";
        res.status(200).json({ msg });
    } catch (error) {
        throw Error(error);
    }
}

const getInfoUser = async ( req,res ) => {
    try {
        const query = " SELECT user.id, alias, first_name, last_name, email, password, description, role.label AS role, photo_url FROM user JOIN role ON role.id = user.role_id JOIN photo ON photo.user_id = user.id WHERE user.alias = ? ";
        const [datas] = await Query.findByDatas(query, req.params);
        res.status(200).json({ datas });
    } catch (error) {
        throw Error(error);
    }
}

const getUserPublication = async ( req,res ) => {
    try {
        const query = " SELECT alias, label, content, publication.create_at, image.url_img FROM publication JOIN image ON publication.id = image.publication_id JOIN user ON user.id = publication.user_id WHERE user.alias = ? ";
        const [datas] = await Query.findByDatas(query, req.params);
        res.status(200).json({ datas });
    } catch (error) {
        throw Error(error);
    }
}

const getUserSub = async ( req, res ) => {
    try{
        const query = " SELECT subscription.id, label, price_month, content, user.alias, category_id FROM subscription JOIN user ON user.id = subscription.user_id WHERE user.alias = ? ";
        const [datas] = await Query.findByDatas(query, req.params);
        res.status(200).json({ datas });
    } catch (error) {
        throw Error(error);
    }
}

export { check_token, createAccount, signin, signout, getInfoUser, getUserPublication, getUserSub };