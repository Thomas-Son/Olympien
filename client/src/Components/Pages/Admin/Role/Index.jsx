import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Loading from "../../../Containers/Loading/Index"

import styles from "../Admin.module.css"

import PanelAdmin from "../Panel/Index";

function RoleList() {

    const [role, setRole] = useState(null);
    const [roleList, setRoleList] = useState(null);
    const [msg, setMsg] = useState(null);

    const navigate = useNavigate();

    const TOKEN = localStorage.getItem('auth');

    useEffect(() => {
        async function getData() {
            try {
                const roles = await (
                    await fetch("/api/v1/admin/role/all", {
                        method: 'get',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authentication': `Bearer ${TOKEN}`,
                        },
                    }
                )).json();
                setRoleList(roles.datas);
                console.log(roles)
                console.log(roleList)
            } catch (error) {
                throw Error(error);
            }
        }
        getData();
    }, [roleList]);

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch("/api/v1/admin/role/add", {
            method: "post",
            headers: {
                'Content-Type': 'application/json',
                'Authentication': `Bearer ${TOKEN}`,
            },
            body: JSON.stringify({ role }),
        });
        const json = await res.json();
        setMsg(json.msg);

        if (res.status === 201) {
            navigate("/admin/role");
        }
    }

    return (
        <main className={styles.admin}>
            <PanelAdmin />
            <h2>Liste des rôles</h2>

            <ul>
                {!roleList ? (
                    <Loading />
                ) : (
                    roleList.map((datas) => 
                    <li className={styles.adminList}>
                        <p>{datas.label}</p>
                        <div>
                            <Link to={"modifier/" + datas.id}>Modifier</Link>
                            <Link to={"supprimer/" + datas.id} >Supprimer</Link>
                        </div>
                        
                    </li>
                    )
                )}
            </ul>
            

            <form onSubmit={handleSubmit} className={styles.formAdmin}>
                {msg && <p>{msg}</p>}
                <input
                    placeholder="Entrer le nom du nouveau rôle"
                    type="text"
                    name="label"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                />

                <button type="submit">Ajouter le nouveau rôle</button>
            </form>
        </main>
    );
}

export default RoleList;