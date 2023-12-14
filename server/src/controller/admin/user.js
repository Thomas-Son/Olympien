import Query from "../../model/Query.js";

const getUserAll = async (req, res) => {

    const query = " SELECT * FROM user ";
    const [datas] = await Query.find(query);

    res.status(200).json({ datas });
};

export { getUserAll };