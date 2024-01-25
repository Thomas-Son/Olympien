import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Loading from "../../../../Containers/Loading/Index"

import styles from "../../Admin.module.css"

import PanelAdmin from "../../Panel/Index";

function DeleteUser() {

    const [userInfo, setUserInfo] = useState(null);
    const [id, setId] = useState(null);

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function getData() {
            try {
                const info = await (await fetch("/api/v1/admin/user/" + params.id)).json();
                setUserInfo(info.datas);
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
        const res = await fetch("/api/v1/admin/user/delete/" + params.id, {
            method: "delete",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });

        if (res.status === 201) {
            navigate("/admin/utilisateur");
        }

    }


    return (
        <main className={styles.admin}>
            <PanelAdmin />
            <h2>Supprimer</h2>

            {!userInfo ? (
                <Loading />
            ) : (
                userInfo.map((datas) =>
                    <form onSubmit={handleSubmit} className={styles.formAdmin}>
                        <p>Voulez-vous supprimer l'utilisateur suivant ?</p>
                        <p>Pseudo : {datas.alias}</p>
                        <p>Email : {datas.email}</p>
                        <p>Créé le : {new Date(datas.create_at).toLocaleDateString()}</p>
                        <button type="submit">Valider</button>
                        <Link to={"/admin/utilisateur"} className={styles.cancel}>Annuler</Link>
                    </form>
                )
            )}

        </main>
    );
}

export default DeleteUser;