import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Loading from "../../../../Containers/Loading/Index"

import PanelAdmin from "../../Panel/Index";

import styles from "../../Admin.module.css"

function UpdateCategory() {

    const [categoryInfo, setCategoryInfo] = useState(null);
    const [category, setCategory] = useState(null);
    const [id, setId] = useState(null);

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function getData() {
            try {
                const info = await (await fetch("/api/v1/admin/category/" + params.id)).json();
                setCategoryInfo(info.datas);
                setId(info.datas[0].id)
                console.log(id)
            } catch (error) {
                throw Error(error);
            }
        }
        getData();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch("/api/v1/admin/category/update/" + params.id, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ category, id }),
        });

        if (res.status === 201) {
            navigate("/admin/categorie");
        }

    }


    return (
        <main className={styles.admin}>
            <PanelAdmin />

            <h2>Modifier</h2>
            {!categoryInfo ? (
                <Loading />
            ) : (
                categoryInfo.map((datas) =>
                    <form onSubmit={handleSubmit} className={styles.formAdmin}>
                        <p>Souhaitez-vous modifier la catégorie : {datas.label} ?</p>
                        <input
                            placeholder="Entrer la nouvelle catégorie"
                            type="text"
                            name="label"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                        <button type="submit">Valider</button>
                        <Link to={"/admin/categorie"} className={styles.cancel}>Annuler</Link>
                    </form>
                )
            )}

        </main>
    );
}

export default UpdateCategory;