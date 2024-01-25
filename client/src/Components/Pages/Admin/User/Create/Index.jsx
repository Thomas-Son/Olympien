import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import PanelAdmin from "../../Panel/Index";

import styles from "../../Admin.module.css"

function CreateUser() {

    const navigate = useNavigate();

    const [alias, setAlias] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const [msg, setMsg] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch("/api/v1/admin/user/create", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ alias, email, password, role }),
        });
        const json = await res.json();
        setMsg(json.msg);

        if (res.status === 201) {
            navigate("/admin/utilisateur");
        }
    }

    return (
        <main className={styles.admin}>
            <PanelAdmin />
            <h2>Création d'un nouvel utilisateur</h2>

            <form onSubmit={handleSubmit} className={styles.formAdmin}>
                {msg && <p>{msg}</p>}

                <input
                    placeholder="Pseudo"
                    type="text"
                    name="alias"
                    value={alias}
                    onChange={(e) => setAlias(e.target.value)}
                />

                <input
                    placeholder="Email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    placeholder="Mot de passe"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <select name="role" onChange={(e) => setRole(e.target.value)}>
                    <option value="">-- Sélectionner un role --</option>
                    <option value="1">Utilisateur</option>
                    <option value="2">Administrateur</option>
                    <option value="3">Coach</option>
                </select>

                <button type="submit">
                    Valider
                </button>
                <Link to={"/admin/utilisateur"} className={styles.cancel}>Annuler</Link>
            </form>
        </main>
    );
}

export default CreateUser;