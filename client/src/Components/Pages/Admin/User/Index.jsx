import { useState, useEffect } from "react";
import Loading from "../../../Containers/Loading/Index"

function UserList() {

    const [userList, setUserList] = useState(null);

    useEffect(() => {
        async function getData() {
            try {
                const users = await (await fetch("/api/v1/admin/user/all")).json();
                setUserList(users.datas);
            } catch (error) {
                throw Error(error);
            }
        }
        getData();
    }, []);

    return (
        <main id="userList">
            {!userList ? (
                <Loading />
            ) : (
                userList.map((datas) => <p><a href={datas.alias} >{ datas.alias }</a></p>)
            )}

            <form action="/admin/user/add" method="post">

                <input type="text" name="alias" placeholder="Entrer le pseudo du nouvel utilisateur" />
                <input type="text" name="first_name" placeholder="Entrer le prénom du nouvel utilisateur" />
                <input type="text" name="last_name" placeholder="Entrer le nom de famille du nouvel utilisateur" />

                <button type="submit">ajouter le nouvel utilisateur</button>

            </form>
        </main>
    );
}

export default UserList;