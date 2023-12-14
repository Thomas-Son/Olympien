import { useState, createRef } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Post.module.css";


function Post() {

    const navigate = useNavigate();

    const [label, setLabel] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");

    const fileInput = createRef();
    const [msg, setMsg] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
       
        const formData = new FormData();

        formData.set("label", label);
        formData.set("content", content);
        formData.set("user_id", localStorage.user_id);
        formData.set("category", category);
        formData.set("url_img", fileInput.current.files[0]);

        const res = await fetch("/api/v1/post/add", {
            method: 'POST',
            body: formData
        });
        const json = await res.json();
        setMsg(json.msg);

        if (res.status === 201) {
            console.log("Direction accueil !")
            navigate("/accueil");
        }
        if (res.status === 409) { // Erreur 409 non résolu
            console.log("Direction accueil !")
            navigate("/accueil");
        }
    }

    return (
        <main>
            <form onSubmit={handleSubmit} className={styles.post}>
                {msg && <p>{msg}</p>}
                <input
                    placeholder="Titre"
                    type="text"
                    name="label"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                />
                <input
                    placeholder="Description"
                    type="text"
                    name="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <select name="category" onChange={(e) => setCategory(e.target.value)}>
                    <option value="">-- Sélectionner une catégorie --</option>
                    <option value="1">Musculation</option>
                    <option value="2">Running</option>
                    <option value="3">Crossfit</option>
                    <option value="4">Fitness</option>
                    <option value="5">Spécialités</option>
                    <option value="6">Loisir</option>
                </select>
                <input
                    type="file" 
                    name="url_img"
                    ref={fileInput}
                    multiple
                />
                <button type="submit">Publier</button>
            </form>
        </main>
    );
}

export default Post;