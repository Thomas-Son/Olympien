import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Loading from "../../../../Containers/Loading/Index"

import styles from "../../Admin.module.css"

import PanelAdmin from "../../Panel/Index";

function DeleteUser() {

    const [userInfo, setUserInfo] = useState(null);
    const [alias, setAlias] = useState(null);
    const [email, setEmail] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [phone, setPhone] = useState(null);
    const [id, setId] = useState(null);

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function getData() {
            try {
                const info = await (await fetch("/api/v1/admin/user/" + params.id)).json();
                setUserInfo(info.datas);
                setAlias(info.datas[0].alias)
                setEmail(info.datas[0].email)
                setLastName(info.datas[0].last_name)
                setFirstName(info.datas[0].first_name)
                setPhone(info.datas[0].phone)
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
        const res = await fetch("/api/v1/admin/user/update/" + params.id, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ alias, email, lastName, firstName, phone, id }),
        });

        if (res.status === 201) {
            navigate("/admin/utilisateur");
        }

    }


    return (
        <main className={styles.admin}>
            <PanelAdmin />
            <h2>Modifier</h2>

            {!userInfo ? (
                <Loading />
            ) : (
                userInfo.map((datas) =>
                    <form onSubmit={handleSubmit} className={styles.formAdmin}>
                        <p>Voulez-vous modifier l'utilisateur suivant ?</p>
                        <p>Pseudo : {datas.alias}</p>
                        <p>Email : {datas.email}</p>
                        <p>Nom : {datas.last_name}</p>
                        <p>Prénom : {datas.first_name}</p>
                        <p>Téléphone : {datas.phone}</p>
                        <p>Créé le : {new Date(datas.create_at).toLocaleDateString()}</p>
                        <input
                            placeholder="Entrer le nouveau pseudo"
                            type="text"
                            name="label"
                            value={alias}
                            onChange={(e) => setAlias(e.target.value)}
                        />
                        <input
                            placeholder="Entrer le nouvel email"
                            type="text"
                            name="label"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            placeholder="Entrer le nouveau nom"
                            type="text"
                            name="label"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <input
                            placeholder="Entrer le nouveau prénom"
                            type="text"
                            name="label"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <input
                            placeholder="Entrer le nouveau numéro de téléphone"
                            type="text"
                            name="label"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <button type="submit">Valider</button>
                        <Link to={"/admin/utilisateur"} className={styles.cancel}>Annuler</Link>
                    </form>
                )
            )}

        </main>
    );
}

export default DeleteUser;