import Query from "../../model/Query.js";

const getRoleAll = async (req, res) => {

    const query = " SELECT * FROM role ";
    const [datas] = await Query.find(query);

    res.status(200).json({ datas });
};

const getRole = async (req, res) => {

    const query = " SELECT * FROM role WHERE role.id = ?";
    const [datas] = await Query.findByDatas(query, req.params);

    res.status(200).json({ datas });
};

const addRole = async (req, res) => {
    try {
        let msg = "Nouveau rôle créé"
        const data = { role: req.body.role };
        const query = " INSERT INTO role (label) VALUE (?) ";
        await Query.write(query, data);

        res.status(201).json({ msg });
    }
    catch (error) {
        throw Error(error);
    }
}

const deleteRole = async (req, res) => {
    try {
        let msg = ""
        const query = "DELETE FROM role WHERE id = ?";
        await Query.findByValue(query, req.params.id);

        msg = "Le rôle a été supprimé.";
        res.status(201).json({ msg });

    } catch (error) {
        throw Error(error);
    }
};

const updateRole = async (req, res) => {
    try {
        let msg = "";
        const datas = {
            role: req.body.role,
            id: req.body.id
        };

        const query =
            "SELECT id, label FROM role WHERE id = ?";
        const [role] = await Query.findByDatas(query, req.params);

        if (role.length) {
            const query =
                "UPDATE role SET label = ? WHERE id = ?";
            await Query.write(query, datas);

            msg = "Le rôle a été modifié.";
            res.status(201).json({ msg });
        }

    } catch (error) {
        throw Error(error);
    }
};


export { getRoleAll, addRole, deleteRole, updateRole, getRole };