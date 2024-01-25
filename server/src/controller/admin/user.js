import { hash } from "bcrypt";
import Query from "../../model/Query.js";

const SALT = 10;

const getUserAll = async (req, res) => {

    const query = " SELECT * FROM user ";
    const [datas] = await Query.find(query);

    res.status(200).json({ datas });
};

const getUser = async (req, res) => {

    const query = " SELECT * FROM user WHERE user.id = ?";
    const [datas] = await Query.findByValue(query, req.params.id);

    res.status(200).json({ datas });
};

const createUser = async (req, res) => {
    try {
        let msg = "";
        const datas = {
            alias: req.body.alias, 
            email: req.body.email,
        };
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
                role_id: req.body.role,
            };
            const query =
                "INSERT INTO user (alias, email, password, role_id, description, create_at) VALUES(?, ?, ?, ?, 'soon.', NOW())";
            const [account] = await Query.write(query, datas);

            const photo = {
                photo_url: "no-photo.webp",
                user_id: account.insertId,
            }

            const query2 = "INSERT INTO photo (photo_url, user_id) VALUES (?, ?)";
            await Query.write(query2, photo)

            msg = "utilisateur créé";
            res.status(201).json({ msg });
        }
    }
    catch (error) {
        throw Error(error);
    }
}

const deleteUser = async (req, res) => {
    try {
        let msg = ""
        const query = "DELETE FROM user WHERE id = ?";
        await Query.findByValue(query, req.params.id);

        msg = "L'utilisateur a été supprimée";
        res.status(201).json({ msg });

    } catch (error) {
        throw Error(error);
    }
};

const updateUser = async (req, res) => {
    try {
        let msg = ""
        const datas = {
            alias: req.body.alias,
            email: req.body.email,
            last_name: req.body.lastName,
            first_name: req.body.firstName,
            phone: req.body.phone,
            id: req.body.id,
        };
        const query =
            "SELECT id, alias, email, last_name, first_name, phone FROM user WHERE user.id = ?";
        const [user] = await Query.findByDatas(query, req.params);

        if (user.length) {
            const query =
                "UPDATE user SET alias = ? , email = ? , last_name = ? , first_name = ? , phone = ? WHERE user.id = ?";
            await Query.write(query, datas);

            msg = "L'utilisateur a été mise à jour !";
            res.status(201).json({ msg });
        }
    } catch (error) {
        throw Error(error);
    }
};

export { getUserAll, getUser, createUser, deleteUser, updateUser };