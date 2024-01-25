import Query from "../../model/Query.js";

const getSub = async (req, res) => {

    const query = " SELECT * FROM role ";
    const [datas] = await Query.find(query);

    res.status(200).json({ datas });
};

const addSub = async (req, res) => {
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

const deleteSub = async (req, res) => {
    try {
        let msg = ""
        const query = "DELETE FROM category WHERE id = ?";
        await Query.deleteByValue(query, req.params.id);

        msg = "La catégorie a été supprimée";
        res.status(201).json({ msg });

    } catch (error) {
        throw Error(error);
    }
};

const changeSub = async (req, res) => {
    try {
        let msg = ""
        const query = "UPDATE FROM categories WHERE id = ?";
        await Query.deleteByValue(query, req.params.id);

        msg = "La catégorie a été modifiée";
        res.status(201).json({ msg });

    } catch (error) {
        throw Error(error);
    }
};


export { getSub, addSub, deleteSub, changeSub };