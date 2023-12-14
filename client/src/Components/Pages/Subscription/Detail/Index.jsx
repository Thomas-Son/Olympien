import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../../Containers/Loading/Index"

import styles from "./Detail.module.css";

function DetailSub() {

    const [subDetail, setSubDetail] = useState(null);

    const params = useParams();

    useEffect(() => {
        async function getData() {
            try {
                const sub = await (await fetch("/api/v1/sub/" + params.id)).json();
                setSubDetail(sub.datas);

            } catch (error) {
                throw Error(error);
            }
        };
        getData();
    }, []);

    return (
        <main>
            <div className={styles.subDetail_bg}>
            {!subDetail ? (
                <Loading />
            ) : (
                subDetail.map((datas) =>
                    <article className={styles.subDetail}>
                        <p>{datas.label}</p>
                        <p>Proposé par : {datas.alias}</p>
                        <p>{datas.content}</p>
                        <p>Mail : <a href={"mailto:" + datas.email}>{datas.email}</a></p>
                        <p>Tel : <a href={"tel:+33" + datas.phone.slice(1)}>{datas.phone}</a></p>
                        <div>
                            <p>Disponible le : </p>
                            <ul>
                                {!datas.mon ? "" : <li>Lundi</li>}
                                {!datas.tues ? "" : <li>Mardi</li>}
                                {!datas.wed ? "" : <li>Mercredi</li>}
                                {!datas.thurs ? "" : <li>Jeudi</li>}
                                {!datas.fri ? "" : <li>Vendredi</li>}
                                {!datas.sat ? "" : <li>Samedi</li>}
                                {!datas.sun ? "" : <li>Dimanche</li>}
                            </ul>                            
                        </div>                        
                        <div>
                            <p>Tarifs :</p>
                            <ul>
                                <li>{datas.price_month} / mois</li>
                                <li>{datas.price_6months} / 6 mois</li>
                                <li>{datas.price_12months} / 12 mois</li>
                            </ul>
                            
                        </div>                        
                    </article>
                )
            )}
            </div>
        </main>
    );
}

export default DetailSub;