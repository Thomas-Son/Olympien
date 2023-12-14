import Query from "../model/Query.js";
import formidable from "formidable";

const addPost = async(req, res) => {
    try {
        
        const form = formidable({
            uploadDir: "public/image/post",
            keepExtensions: true,
            allowEmptyFiles: false,
            multiples: true,
        });

        form.parse(req, async (err, fields, files) => {
            let msg = "";
            const post = {};
            for (const key in fields) {
                post[key] = fields[key][0];
            }

            const query1 = "INSERT INTO publication (label, content, create_at, user_id, category_id) VALUES ( ?, ?, NOW(), ?, ?)";
            const [result1] = await Query.write(query1, post);

            const img = {
                url: Object.keys(files).length ? files.url_img[0].newFilename : "no-picture.webp",
                publication_id: result1.insertId,
            }

            const query2 = "INSERT INTO image (url_img, publication_id) VALUES (?, ?)";
            const [pub] = await Query.write(query2, img);

            if (pub.length) {
                msg = "Votre post a été publié.";
                res.status(201).json({ msg });
            }
            if (!pub.length) {
                msg = "Champ(s) manquant(s)";
                res.status(409).json({ msg });
            }

        });
    } catch (error) {
        throw Error(error);
    }
}

export { addPost };