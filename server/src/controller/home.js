import Query from "../model/Query.js";

const getPost = async (req, res) => {
    try {
        const queryUser = "SELECT alias, label, content, publication.create_at, image.url_img FROM publication JOIN image ON publication.id = image.publication_id JOIN user ON user.id = publication.user_id";
        const [datas] = await Query.findByValue(queryUser);
        res.status(200).json({ datas })
    } catch (error) {
        throw Error(error);
    }
};

export { getPost };