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

const getCategory = async (req, res) => {

    const query = " SELECT * FROM category WHERE category.id = ?";
    const [datas] = await Query.findByDatas(query, req.params);

    res.status(200).json({ datas });
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

const deleteCategory = async (req, res) => {
    try {
        let msg = ""
        const query = "DELETE FROM category WHERE id = ?";
        await Query.findByValue(query, req.params.id);

        msg = "La catégorie a été supprimée.";
        res.status(201).json({ msg });

    } catch (error) {
        throw Error(error);
    }
};

const updateCategory = async (req, res) => {
    try {
        let msg = "";
        const datas = {
            category: req.body.category,
            id: req.body.id
        };

        const query =
            "SELECT id, label FROM category WHERE id = ?";
        const [category] = await Query.findByDatas(query, req.params);

        if (category.length) {
            const query =
                "UPDATE category SET label = ? WHERE id = ?";
            await Query.write(query, datas);

            msg = "La catégorie a été modifiée.";
            res.status(201).json({ msg });
        }
    } catch (error) {
        throw Error(error);
    }
};


export { getCategoryAll, getCategory, addCategory, deleteCategory, updateCategory };