import Query from "../model/Query.js";

const getCategory = async (req, res) => {
    try {
        const query = " SELECT * FROM category ";
        const [datas] = await Query.find(query);

        res.status(200).json({ datas });
    }
    catch (error) {
        throw Error(error);
    }
};

export { getCategory };