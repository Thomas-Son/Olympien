import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../../../Containers/Loading/Index";

import styles from "./Publication.module.css";

function Publication() {

    const [allPosts, setAllPosts] = useState(null);

    const params = useParams();

    useEffect(() => {
        async function getData() {
            try {
                const posts = await (await fetch("/api/v1/user/publication/" + params.alias)).json();
                setAllPosts(posts.datas);
            } catch (error) {
                throw Error(error);
            }
        }
        getData();
    }, []);

    return (
        <div>
            {!allPosts ? (
                <Loading />
            ) : (
                
                allPosts.map((datas) =>
                    <article className={styles.publication}>
                        <h4>{datas.label}</h4>
                        <img src={"image/post/" + datas.url_img}
                            alt=""
                        />
                        <p>{datas.content}</p>
                        <p>Par {datas.alias}</p>
                        <p>Publié le {new Date(datas.create_at).toLocaleDateString()}</p>
                    </article>
                )
            )}
        </div>
    );
}

export default Publication;