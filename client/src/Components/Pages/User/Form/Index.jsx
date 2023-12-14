import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { signin } from "../../../../store/slice/user";
import styles from "./Form.module.css";


function Form({ type }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [alias, setAlias] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [msg, setMsg] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch("/api/v1/user/sign" + type, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ alias, email, password }),
        });
        const json = await res.json();
        setMsg(json.msg);

        if (type === "in" && res.status === 200) {

            const info = await (await fetch("/api/v1/user/" + alias)).json();

            localStorage.setItem("auth", json.TOKEN);
            localStorage.setItem("user_role", info.datas[0].role);
            localStorage.setItem("user_id", info.datas[0].id);

            dispatch(signin({ alias }));
            navigate("/" + alias);
        }

        if (type === "up" && res.status === 201) {
            navigate("/utilisateur/connexion");
        }
    }

    return (
        <main >
            <form onSubmit={handleSubmit} className={styles.form}>
                {msg && <p>{msg}</p>}
                
                <input
                    placeholder="Votre alias"
                    type="text"
                    name="alias"
                    value={alias}
                    onChange={(e) => setAlias(e.target.value)}
                />

                <input
                    placeholder="Votre email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    placeholder="Votre mot de passe"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">
                    {type === "in" ? "Se connecter" : "S'enregistrer"}
                </button>

                {type === "in" && (
                    <p>
                        Pas de compte ?{" "}
                        <Link to="/utilisateur/inscription">En créer un</Link>
                    </p>
                )}
            </form>
        </main>
    );
}

export default Form;