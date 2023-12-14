import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../../Containers/Loading/Index"

import Publication from "./Publication/Index"
import Sub from "./Sub/Index"

import styles from "./Profile.module.css";

function Profile() {

    const [infoUser, setinfoUser] = useState(null);

    const params = useParams();

    useEffect(() => {
        async function getData() {
            try {
                const info = await (await fetch("/api/v1/user/" + params.alias)).json();
                setinfoUser(info.datas);
            } catch (error) {
                throw Error(error);
            }
        }
        getData();
    }, []);

    return (
        <main>
            <div className={styles.profile_bg}>
            {!infoUser ? (
                <Loading />
            ) : (
                infoUser.map((datas) =>
                    <section className={styles.profile}>
                        <img src={"image/user/" + datas.photo_url} alt="" />
                        <h3>@{datas.alias}</h3>
                        <p>{datas.first_name} {datas.last_name}</p>
                        <p>{datas.description}</p>

                        {datas.role === "coach" && (
                            <>
                                <p>Abonnements proposés</p>
                                <Sub />
                            </>
                        )}
                        <p>Publications</p>
                        <Publication />
                    </section>
                )
            )}
            </div>
        </main>
    );
}

export default Profile;