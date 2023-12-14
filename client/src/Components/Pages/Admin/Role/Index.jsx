import { useState, useEffect } from "react";
import { useNavigate, } from "react-router-dom";
import Loading from "../../../Containers/Loading/Index"

function RoleList() {

    const [role, setRole] = useState(null);
    const [roleList, setRoleList] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        async function getData() {
            try {
                const roles = await (await fetch("/api/v1/admin/role/all")).json();
                setRoleList(roles.datas);
            } catch (error) {
                throw Error(error);
            }
        }
        getData();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch("/api/v1/admin/role/add", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ role }),
        });

        navigate("/admin");
    }

    return (
        <main id="roleList">
            {!roleList ? (
                <Loading />
            ) : (
                roleList.map((datas) => <p>{datas.label}</p>)
            )}

            <form onSubmit={handleSubmit}>

                <input
                    placeholder="Entrer le nom du nouveau rôle"
                    type="text"
                    name="label"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                />

                <button type="submit">ajouter le nouveau rôle</button>

            </form>
        </main>
    );
}

export default RoleList;