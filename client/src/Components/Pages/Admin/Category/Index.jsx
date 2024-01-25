import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Loading from "../../../Containers/Loading/Index"

import PanelAdmin from "../Panel/Index";

import styles from "../Admin.module.css"

function CategoryList() {

    const [category, setCategory] = useState(null);
    const [categoryList, setCategoryList] = useState(null);

    const navigate = useNavigate();

    const TOKEN = localStorage.getItem('auth');

    useEffect(() => {
        async function getData() {
            try {
                const categorys = await (
                    await fetch("/api/v1/admin/category/all", {
                        method: 'get',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authentication': `Bearer ${TOKEN}`,
                        },
                    }
                )).json();
                setCategoryList(categorys.datas);
            } catch (error) {
                throw Error(error);
            }
        }
        getData();
    }, [categoryList]);


    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch("/api/v1/admin/category/add", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ category }),
        });
        
        navigate("/admin/categorie");
    }

    return (

        <main className={styles.admin}>
            <PanelAdmin />
            <h2>Liste des catégories</h2>

            <ul>
                {!categoryList ? (
                    <Loading />
                ) : (
                        categoryList.map((datas) => 
                            <li className={styles.adminList}>
                                <p>{datas.label}</p>
                                <div>
                                    <Link to={"modifier/" + datas.id}>Modifier</Link>
                                    <Link to={"supprimer/" + datas.id} >Supprimer</Link>
                                </div>
                            </li>
                        )
                )}
            </ul>
            
            <form onSubmit={handleSubmit} className={styles.formAdmin}>

                <input
                    placeholder="Entrer la nouvelle catégorie"
                    type="text"
                    name="label"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />

                <button type="submit">Ajouter la nouvelle catégorie</button>

            </form>
        </main>
    );
}

export default CategoryList;