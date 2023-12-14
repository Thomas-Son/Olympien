import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../../../Containers/Loading/Index";

import styles from "./Publication.module.css";

function Home() {

    const [allPosts, setAllPosts] = useState(null);

    useEffect(() => {
        async function getData() {
            try {
                const posts = await (await fetch("/api/v1/")).json();
                setAllPosts(posts.datas);
            } catch (error) {
                throw Error(error);
            }
        }
        getData();
    }, []);

    return (
        <main>
            <section className={styles.home}>
                {!allPosts ? (
                    <Loading />
                ) : (
                    allPosts.map((datas) =>
                        <article className={styles.publication}>
                            <h4>{datas.label}</h4>
                            <img src={"image/post/" + datas.url_img}
                                alt="SOON"
                                width={200}
                                height={200}
                            />       
                            <p>{datas.content}</p>
                            <p>Par <Link to={"/" + datas.alias}>{datas.alias}</Link></p>
                            <p>Publié le {new Date(datas.create_at).toLocaleDateString()}</p>
                        </article>
                    )
                )}
            </section>
        </main>
    );
}

export default Home;