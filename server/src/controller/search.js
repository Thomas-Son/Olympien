import Query from "../model/Query.js";


const searchUserList = async (req, res) => {

    try {
        const query = " SELECT * FROM user WHERE user.alias LIKE CONCAT ( '%', ?, '%' ) ";
        const [datas] = await Query.findByDatas(query, req.params);
        res.status(200).json({ datas });
    } catch (error) {
        throw Error(error);
    }

};

export { searchUserList };