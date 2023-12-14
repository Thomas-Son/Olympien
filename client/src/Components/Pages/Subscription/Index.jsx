import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../../Containers/Loading/Index"

import PostSub from "./SubPost/Index"

import styles from "./Sub.module.css";

function Sub() {

    const [categories, setCategories] = useState(null);
    const [subs, setSubs] = useState(null);

    const [subsByCategory, setSubsByCategory] = useState(null);

    useEffect(() => {
        async function getData() {
            try {
                const subs = await (await fetch("/api/v1/sub/all")).json();
                setSubs(subs.datas);

                const categories = await (await fetch("/api/v1/category/all")).json();
                setCategories(categories.datas);
            } catch (error) {
                throw Error(error);
            }
        };
        getData();
    }, []);

    useEffect(() => {
        const datas = [];
        if (categories) {
            for (const category of categories) {
                datas.push({
                    category: category,
                    subs: subs.filter((sub) => sub.category_id === category.id),
                });
            }
        };
        console.log(datas);
        setSubsByCategory(datas);
    }, [categories]);

    

    return (
        <main>
            <div className={styles.sub_bg}>
            {localStorage.user_role === "coach" && <PostSub />}
            {!subsByCategory ? (
                <Loading />
            ) : (
                subsByCategory.map((datas) =>
                    <>
                    
                    <section className={styles.category}>
                        <h2>{datas.category.label}</h2>
                            <Link to={"/abonnement/categorie/" + datas.category.label}>En voir plus</Link>
                        {datas.subs.map((sub) => 
                        <article className={styles.sub}>
                                <div>
                                    <p>{sub.label}</p>
                                    <p>Proposé par : {sub.alias}</p>
                                    <p>{sub.content}</p>
                                    <p>A partir de :</p>
                                    <p>{sub.price_month}€ / mois</p>
                                    <Link to={"/abonnement/" + sub.id}>En savoir plus</Link>
                                </div>
                        </article>
                        )}
                    </section>
                    </>
                )
            )}
            </div>
        </main>
    );
}

export default Sub;