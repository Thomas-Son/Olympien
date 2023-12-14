import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./SubPost.module.css";

function PostSub() {

    const [label, setLabel] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [mon, setMon] = useState("0");
    const [tues, setTues] = useState("0");
    const [wed, setWed] = useState("0");
    const [thurs, setThurs] = useState("0");
    const [fri, setFri] = useState("0");
    const [sat, setSat] = useState("0");
    const [sun, setSun] = useState("0");
    const [price, setPrice] = useState("");
    const [price2, setPrice2] = useState("");
    const [price3, setPrice3] = useState("");
    const user_id = localStorage.user_id

    const navigate = useNavigate();
    const [msg, setMsg] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();

        const res = await fetch("/api/v1/sub/post", {
            method: "post",
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify({ label, content, category, mon, tues, wed, thurs, fri, sat, sun, price, price2, price3, user_id }),
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
        <>
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

                <div className={styles.checkbox}>
                    <p>Disponibilités:</p>
                    <div>
                        <input type="checkbox" name="lundi" value="1" onChange={(e) => setMon(e.target.value)} /> Lundi <br />
                    </div>
                    <div>
                        <input type="checkbox" name="mardi" value="1" onChange={(e) => setTues(e.target.value)} /> Mardi <br />
                    </div>
                    <div>
                        <input type="checkbox" name="mercredi" value="1" onChange={(e) => setWed(e.target.value)} /> Mercredi <br />
                    </div>
                    <div>
                        <input type="checkbox" name="jeudi" value="1" onChange={(e) => setThurs(e.target.value)} /> Jeudi <br />
                    </div>
                    <div>
                        <input type="checkbox" name="vendredi" value="1" onChange={(e) => setFri(e.target.value)} /> Vendredi <br />
                    </div>
                    <div>
                        <input type="checkbox" name="samedi" value="1" onChange={(e) => setSat(e.target.value)} /> Samedi <br />
                    </div>
                    <div>
                        <input type="checkbox" name="dimanche" value="1" onChange={(e) => setSun(e.target.value)} /> Dimanche <br />
                    </div>
                </div>

                <input
                    placeholder="Prix en € / mois"
                    type="text"
                    name="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <input
                    placeholder="Prix en € / 6 mois"
                    type="text"
                    name="price"
                    value={price2}
                    onChange={(e) => setPrice2(e.target.value)}
                />
                <input
                    placeholder="Prix en € / 12 mois"
                    type="text"
                    name="price"
                    value={price3}
                    onChange={(e) => setPrice3(e.target.value)}
                />

                <button type="submit">Publier</button>
            </form>
        </>
    );
}

export default PostSub;