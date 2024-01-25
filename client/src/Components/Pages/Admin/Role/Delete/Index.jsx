import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Loading from "../../../../Containers/Loading/Index"

import PanelAdmin from "../../Panel/Index";

import styles from "../../Admin.module.css"

function DeleteRole() {

    const [roleInfo, setRoleInfo] = useState(null);
    const [id, setId] = useState(null);

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function getData() {
            try {
                const info = await (await fetch("/api/v1/admin/role/" + params.id)).json();
                setRoleInfo(info.datas);
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
        const res = await fetch("/api/v1/admin/role/delete/" + params.id, {
            method: "delete",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });

        if (res.status === 201) {
            navigate("/admin/role");
        }

        }
    

    return (
        <main className={styles.admin}>
            <PanelAdmin />

            <h2>Supprimer</h2>
            {!roleInfo ? (
                <Loading />
            ) : (
                roleInfo.map((datas) =>
                    <form onSubmit={handleSubmit} className={styles.formAdmin}>
                    <p>Voulez-vous supprimer le rôle : {datas.label} ?</p>
                    <button type="submit">Valider</button>
                        <Link to={"/admin/role"} className={styles.cancel}>Annuler</Link>
                </form>
                )                
            )}

        </main>
    );
}

export default DeleteRole;