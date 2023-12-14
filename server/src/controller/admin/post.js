import Query from "../../model/Query.js";

const getUserPost = async (req, res) => {
    try {
        const query = " SELECT * FROM user JOIN publication ON user.id = publication.user_id WHERE user.alias = ?";
        const [datas] = await Query.findByDatas(query, req.params);

        res.status(200).json({ datas });
    }
    catch (error) {
        throw Error(error);
    }
};

export { getUserPost };