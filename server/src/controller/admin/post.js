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

const createPost = async (req, res) => {
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

const deletePost = async (req, res) => {
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

const changePost = async (req, res) => {
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

export { getUserPost, createPost, deletePost, changePost };