import { useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../Containers/Loading/Index"

import styles from "./Research.module.css"

function SearchUser() {

    const [search, setSearch] = useState("");
    const [userList, setUserList] = useState(null);

    const TOKEN = localStorage.getItem('auth');

    async function handleSubmit(e) {
        e.preventDefault();
        const results = await (await fetch("/api/v1/search/user/" + search, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authentication': `Bearer ${TOKEN}`,
            },
        })).json();
                setUserList(results.datas);
                console.log(userList);
    };

    return (
        <main>
            

            <form onSubmit={handleSubmit} className={styles.research}>
                <h2>Rechercher un utilisateur</h2>
                <input placeholder="Entrer un nom d'utilisateur" type="search" name="search" value={search} onChange={(e) => setSearch(e.target.value)} />
                <button type="submit">
                    Rechercher
                </button>
            </form>

            <section className={styles.research}>
                <h3>Résultat:</h3>
                {!userList
                    ?
                    <Loading />
                    :
                    (
                        <ul>
                            {userList.map(user => (
                                <li>
                                    <Link to={"/" + user.alias}>{user.alias}</Link>                                
                                </li>
                            )
                            )}
                        </ul>
                    )
                }
            </section>
        </main>
    );
}

export default SearchUser;