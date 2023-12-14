import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Loading from "../../../../Containers/Loading/Index";

import styles from "./Sub.module.css";

function Sub() {

    const [allSubs, setAllSubs] = useState(null);

    const params = useParams();

    useEffect(() => {
        async function getData() {
            try {
                const subs = await (await fetch("/api/v1/user/sub/" + params.alias)).json();
                setAllSubs(subs.datas);
            } catch (error) {
                throw Error(error);
            }
        }
        getData();
    }, []);

    return (
        <div className={styles.sub}>
            {!allSubs ? (
                <Loading />
            ) : (
                allSubs.map((datas) =>
                    <div>
                        <p>{datas.label}</p>
                        <p>Proposé par : {datas.alias}</p>
                        <p>{datas.content}</p>
                        <p>A partir de :</p>
                        <p>{datas.price_month}€ / mois</p>
                        <Link to={"/abonnement/" + datas.id}>En savoir plus</Link>
                    </div>
                )
            )}
        </div>
    );
}

export default Sub;