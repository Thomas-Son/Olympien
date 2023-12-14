import Query from "../../model/Query.js";

const getCategoryAll = async (req, res) => {
    try {
        const query = " SELECT * FROM category ";
        const [datas] = await Query.find(query);

        res.status(200).json({ datas });
    }
    catch (error) {
        throw Error(error);
    }
};

const addCategory = async (req, res) => {
    try {
        const data = { category: req.body.category };
        const query = " INSERT INTO category (label) VALUE (?) ";
        await Query.write(query, data);

        res.status(201);
    }
    catch (error) {
        throw Error(error);
    }
}

export { getCategoryAll, addCategory };