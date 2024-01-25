import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../../../Containers/Loading/Index"

import PanelAdmin from "../Panel/Index";

import styles from "../Admin.module.css"

function UserList() {

    const [userList, setUserList] = useState(null);

    useEffect(() => {
        async function getData() {
            try {
                const TOKEN = localStorage.getItem('auth');
                const users = await (
                    await fetch("/api/v1/admin/user/all", {
                        method: 'get',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authentication': `Bearer ${TOKEN}`,
                        },
                    })
                ).json();
                setUserList(users.datas);
            } catch (error) {
                throw Error(error);
            }
        }
        getData();
    }, []);

    return (
        <main className={styles.admin}>
            <PanelAdmin />
            <h2>Liste des utilisateurs</h2>

            <ul>
                {!userList ? (
                    <Loading />
                ) : (
                    userList.map((datas) => 
                        <li className={styles.adminList}>
                            <p>Pseudo : { datas.alias }, Email : {datas.email}</p> 
                            <div>
                                <Link to={"modifier/" + datas.id}>Modifier</Link> 
                                <Link to={"supprimer/" + datas.id}>Supprimer</Link>
                            </div>
                        </li>
                    )
                )}
            </ul>
            

            <Link to={"/admin/utilisateur/ajouter"} className={styles.addAdmin}>Ajouter un utilisateur</Link>

        </main>
    );
}

export default UserList;