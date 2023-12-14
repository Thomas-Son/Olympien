import Query from "../model/Query.js";

const getSub = async (req, res) => {
    try {
        const queryUser = "SELECT subscription.id, label, price_month, content, user.alias, category_id FROM subscription JOIN user ON user.id = subscription.user_id";
        const [datas] = await Query.findByValue(queryUser);
        res.status(200).json({ datas })
    } catch (error) {
        throw Error(error);
    }
};

const subPost = async (req, res) => {
    try {
        let msg = "";
        const datas = {
            label: req.body.label,
            content: req.body.content,
            price_month: req.body.price,
            price_6months: req.body.price2,
            price_12months: req.body.price3,            
            mon: req.body.mon,
            tues: req.body.tues,
            wed: req.body.wed,
            thurs: req.body.thurs,
            fri: req.body.fri,
            sat: req.body.sat,
            sun: req.body.sun,            
            user_id: req.body.user_id,
            category_id: req.body.category,
        };

        console.log(datas)
        const query1 = "INSERT INTO subscription (label, content, price_month, price_6months, price_12months, mon, tues, wed, thurs, fri, sat, sun, create_at, user_id, category_id) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?)";
        const [post] = await Query.write(query1, datas);

        if (post.length) {
            msg = "Votre proposition d'abonnement a été publié.";
            res.status(201).json({ msg });
        }
        if (!post.length) {
            msg = "Champ(s) manquant(s)";
            res.status(409).json({ msg });
        }

    } catch (error) {
        throw Error(error);
    }
}

const getSubDetail = async (req, res) => {
    try {
        const query = " SELECT label, price_month, price_6months, price_12months, content, mon, tues, wed, thurs, fri, sat, sun, user.alias, category_id, email, phone FROM subscription JOIN user ON user.id = subscription.user_id WHERE subscription.id = ? ";
        const [datas] = await Query.findByDatas(query, req.params);
        res.status(200).json({ datas });
    } catch (error) {
        throw Error(error);
    }
}

const getSubCategory = async (req, res) => {
    try {
        const query = " SELECT subscription.label, price_month, price_6months, price_12months, content, mon, tues, wed, thurs, fri, sat, sun, user.alias, category.label, email, phone FROM subscription JOIN user ON user.id = subscription.user_id JOIN category ON category.id = subscription.category_id WHERE category.label = ? ";
        const [datas] = await Query.findByDatas(query, req.params);
        res.status(200).json({ datas });
    } catch (error) {
        throw Error(error)
    }
}

export { getSub, subPost, getSubDetail, getSubCategory };