import Query from "../../model/Query.js";

const getRoleAll = async (req, res) => {

    const query = " SELECT * FROM role ";
    const [datas] = await Query.find(query);

    res.status(200).json({ datas });
};

const addRole = async (req, res) => {
    try {
        const data = { role: req.body.role };
        const query = " INSERT INTO role (label) VALUE (?) ";
        await Query.write(query, data);

        res.status(201);
    }
    catch (error) {
        throw Error(error);
    }
}

export { getRoleAll, addRole };